import json
import re
from pathlib import Path

from dotenv import load_dotenv
from landingai_ade import LandingAIADE

load_dotenv()

SCHEMA = {
    "type": "object",
    "properties": {
        "results": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string", "description": "Nazwa badania laboratoryjnego"},
                    "value": {"type": "string", "description": "Wynik dokładnie jak w dokumencie"},
                    "unit": {"type": "string", "description": "Jednostka, jeśli podana"},
                    "range": {"type": "string", "description": "Zakres referencyjny, jeśli podany"},
                },
                "required": ["name", "value", "unit", "range"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["results"],
    "additionalProperties": False,
}


def remove_obvious_identifiers(text: str) -> str:
    lines = []
    for line in text.splitlines():
        if re.search(r"imię i nazwisko|dane pacjenta|pesel|data urodzenia|adres pacjenta", line, re.I):
            continue
        line = re.sub(r"\b\d{11}\b", "[USUNIĘTO]", line)  # PESEL
        line = re.sub(r"\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b", "[USUNIĘTO]", line)
        lines.append(line)
    return "\n".join(lines)


def parse_medical_document(pdf_path: str) -> str:
    try:
        client = LandingAIADE()
        parsed = client.parse(document=Path(pdf_path), model="dpt-2-latest")

        # Cały PDF jest wysyłany do Parse. Dopiero potem ograniczamy tekst.
        markdown = remove_obvious_identifiers(parsed.markdown or "")
        print("\n=== MARKDOWN PO ANONIMIZACJI ===")
        print(markdown)
        print("================================\n")
        extracted = client.extract(
            schema=json.dumps(SCHEMA, ensure_ascii=False),
            markdown=markdown,
            model="extract-latest",
        )

        chunks = []
        for result in extracted.extraction.get("results", []):
            name = str(result.get("name") or "").strip()
            value = str(result.get("value") or "").strip()
            unit = str(result.get("unit") or "").strip()
            reference_range = str(result.get("range") or "").strip()

            if not name or not value:
                continue

            if re.search(r"imię i nazwisko|dane pacjenta|pesel|data urodzenia|ur\.|adres", name, re.I):
                continue

            chunk = f"Badanie: {name} | Wynik: {value}"
            if unit:
                chunk += f" | Jednostka: {unit}"
            if reference_range:
                chunk += f" | Zakres referencyjny: {reference_range}"
            chunks.append(chunk)

        return "\n".join(chunks)

    except Exception as e:
        print(f"\n=== PRAWDZIWY BŁĄD ===\n{str(e)}\n======================\n")
        return ""


def create_chunks(text: str) -> list[str]:
    return [line.strip() for line in text.splitlines() if line.strip()]
