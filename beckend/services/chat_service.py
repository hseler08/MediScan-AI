from fastapi import HTTPException

from beckend.repositories.json_repository import load_json, save_json, CHAT_JSON_PATH, EXAMS_JSON_PATH
from beckend.repositories.vector_db import PatientDatabase
from beckend.services.llm_engine import MedicalAssistant
from beckend.schemas.chat import ChatRequest


def get_chat_history(profile: str = "Ja"):
    all_chats = load_json(CHAT_JSON_PATH, {})
    return {"messages": all_chats.get(profile, [])}


def chat_with_assistant(req: ChatRequest):
    exams_db = load_json(EXAMS_JSON_PATH, [])
    profile_exams = [exam for exam in exams_db if exam.get("profile", "").lower() == req.profile.lower()]

    if not profile_exams:
        return {
            "reply": f"Nie znalazłam jeszcze żadnych zapisanych badań dla profilu '{req.profile}'. Dodaj najpierw wyniki badań.",
            "messages": [],
        }

    profile_exams.sort(key=lambda exam: exam.get("exam_date", ""), reverse=True)
    latest_exam = profile_exams[0]
    latest_exam_id = latest_exam.get("id")

    db = PatientDatabase()
    vector_hits = db.search_similar(req.message, profile=req.profile, top_k=6)

    context_parts = [
        "Informacje o najnowszym badaniu: "
        f"data={latest_exam.get('exam_date', 'nieznana')}, "
        f"płeć={latest_exam.get('gender', 'nieznana')}, "
        f"wiek={latest_exam.get('age', 'nieznany')}. "
        "Fragmenty poniżej pochodzą z wyszukiwania semantycznego; sprawdzaj datę każdego fragmentu "
        "i nie przedstawiaj starszego wyniku jako aktualnego."
    ]

    seen = set()
    for document in vector_hits:
        content = (document.page_content or "").strip()
        metadata = document.metadata or {}
        if not content:
            continue

        unique_key = (metadata.get("exam_id"), metadata.get("exam_date"), content)
        if unique_key in seen:
            continue
        seen.add(unique_key)

        if metadata.get("exam_id") == latest_exam_id or (
            not metadata.get("exam_id") and metadata.get("exam_date") == latest_exam.get("exam_date")
        ):
            status = "NAJNOWSZE BADANIE"
        else:
            status = "BADANIE HISTORYCZNE LUB DATA NIEZNANA"

        context_parts.append(
            f"[{status} | Data: {metadata.get('exam_date', 'nieznana')} | "
            f"Płeć: {metadata.get('gender', 'nieznana')} | Wiek: {metadata.get('age', 'nieznany')} lat]\n"
            f"{content}"
        )

    latest_is_retrieved = any(
        (document.metadata or {}).get("exam_id") == latest_exam_id
        or (
            not (document.metadata or {}).get("exam_id")
            and (document.metadata or {}).get("exam_date") == latest_exam.get("exam_date")
        )
        for document in vector_hits
    )
    if not latest_is_retrieved and latest_exam.get("clean_markdown"):
        latest_lines = [line.strip() for line in latest_exam["clean_markdown"].splitlines() if line.strip()]
        if latest_lines:
            context_parts.append(
                "Dodatkowe wyniki z najnowszego badania (maksymalnie 8):\n"
                + "\n".join(latest_lines[:8])
            )

    full_context = "\n\n---\n\n".join(context_parts)

    all_chats = load_json(CHAT_JSON_PATH, {})
    profile_history = all_chats.get(req.profile, [])
    if not isinstance(profile_history, list):
        raise HTTPException(status_code=500, detail="Historia rozmowy ma nieprawidłowy format.")

    assistant = MedicalAssistant()
    reply = assistant.generate_response(
        prompt=req.message,
        context=full_context,
        # Wysyłamy tylko ostatnie 12 wiadomości, ale zapisujemy pełną historię lokalnie.
        chat_history=profile_history[-12:],
    )

    profile_history.append({"role": "user", "content": req.message})
    profile_history.append({"role": "assistant", "content": reply})
    all_chats[req.profile] = profile_history
    save_json(CHAT_JSON_PATH, all_chats)

    return {"reply": reply, "messages": profile_history}
