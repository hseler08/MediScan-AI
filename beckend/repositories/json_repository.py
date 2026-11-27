import json
import os
import tempfile

from fastapi import HTTPException

os.makedirs("data", exist_ok=True)

CHAT_JSON_PATH = "data/chat_history.json"
EXAMS_JSON_PATH = "data/exams_db.json"


def load_json(path: str, default):
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as file:
            data = json.load(file)
    except (OSError, json.JSONDecodeError) as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Nie można odczytać pliku danych {os.path.basename(path)}.",
        ) from exc

    if not isinstance(data, type(default)):
        raise HTTPException(
            status_code=500,
            detail=f"Plik danych {os.path.basename(path)} ma nieprawidłowy format.",
        )
    return data


def save_json(path: str, data):
    temp_path = None
    try:
        directory = os.path.dirname(path) or "."
        os.makedirs(directory, exist_ok=True)
        with tempfile.NamedTemporaryFile(
            mode="w", encoding="utf-8", dir=directory, suffix=".tmp", delete=False
        ) as file:
            temp_path = file.name
            json.dump(data, file, ensure_ascii=False, indent=2)
            file.flush()
            os.fsync(file.fileno())
        os.replace(temp_path, path)
    except (OSError, TypeError, ValueError) as exc:
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except OSError:
                pass
        raise HTTPException(status_code=500, detail="Nie udało się zapisać pliku danych.") from exc
