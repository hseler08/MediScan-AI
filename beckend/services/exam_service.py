import os
import uuid
from typing import List

from fastapi import UploadFile, HTTPException

from beckend.processing.parser import parse_medical_document, create_chunks
from beckend.repositories.json_repository import load_json, save_json, EXAMS_JSON_PATH
from beckend.repositories.vector_db import PatientDatabase

os.makedirs("data", exist_ok=True)
os.makedirs("data/temp", exist_ok=True)


def _exam_metadata(exam: dict) -> dict:
    return {
        "exam_id": exam["id"],
        "profile": exam["profile"],
        "exam_date": exam["exam_date"],
        "gender": exam["gender"],
        "age": str(exam["age"]),
    }


async def upload_exam(
    profile: str,
    exam_date: str,
    gender: str,
    age: str,
    file_type: str,
    files: List[UploadFile],
):
    combined_results = []
    temp_paths = []
    db = None
    exam_id = str(uuid.uuid4())

    try:
        os.makedirs("data/temp", exist_ok=True)
        for uploaded_file in files:
            extension = os.path.splitext(uploaded_file.filename or "")[1]
            if not extension:
                extension = ".pdf" if file_type.lower() == "pdf" else ".jpg"

            temp_path = os.path.join("data/temp", f"{uuid.uuid4()}{extension}")
            with open(temp_path, "wb") as file:
                file.write(await uploaded_file.read())
            temp_paths.append(temp_path)

            parsed_results = parse_medical_document(temp_path)
            if parsed_results:
                combined_results.append(parsed_results)

        if not combined_results:
            raise HTTPException(
                status_code=400,
                detail="Nie udało się wyodrębnić wyników badań z przesłanych plików.",
            )

        clean_markdown = "\n".join(combined_results)
        chunks = create_chunks(clean_markdown)
        if not chunks:
            raise HTTPException(status_code=400, detail="Dokument nie zawiera rozpoznanych wyników badań.")

        new_exam_entry = {
            "id": exam_id,
            "profile": profile,
            "exam_date": exam_date,
            "gender": gender,
            "age": age,
            "clean_markdown": clean_markdown,
            "results_table": [],
        }

        exams_db = load_json(EXAMS_JSON_PATH, [])
        exams_db.append(new_exam_entry)
        db = PatientDatabase()

        try:
            db.add_documents(chunks, metadata=_exam_metadata(new_exam_entry))
            save_json(EXAMS_JSON_PATH, exams_db)
        except Exception as exc:
            try:
                db.delete_exam(exam_id)
            except Exception as rollback_error:
                print(f"Nie udało się wycofać wektorów dla badania {exam_id}: {type(rollback_error).__name__}")
            if isinstance(exc, HTTPException):
                raise
            raise HTTPException(status_code=500, detail="Nie udało się zapisać badania w bazach danych.") from exc

        return {
            "status": "success",
            "message": "Wyniki zapisano w bazie danych.",
            "exam": new_exam_entry,
        }

    finally:
        for path in temp_paths:
            if os.path.exists(path):
                try:
                    os.remove(path)
                except OSError:
                    pass


def get_exams(profile: str = "Ja"):
    exams_db = load_json(EXAMS_JSON_PATH, [])
    profile_exams = [exam for exam in exams_db if exam.get("profile", "").lower() == profile.lower()]
    profile_exams.sort(key=lambda exam: exam.get("exam_date", ""), reverse=True)
    return {"exams": profile_exams}


def delete_exam(exam_id: str):
    exams_db = load_json(EXAMS_JSON_PATH, [])
    exam_to_delete = next((exam for exam in exams_db if exam.get("id") == exam_id), None)

    if not exam_to_delete:
        raise HTTPException(status_code=404, detail="Nie znaleziono badania o podanym ID.")

    db = PatientDatabase()
    try:
        db.delete_exam(exam_id)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Nie udało się usunąć fragmentów badania z bazy wektorowej.",
        ) from exc

    updated_exams = [exam for exam in exams_db if exam.get("id") != exam_id]
    try:
        save_json(EXAMS_JSON_PATH, updated_exams)
    except HTTPException:
        try:
            chunks = create_chunks(exam_to_delete.get("clean_markdown", ""))
            db.add_documents(chunks, metadata=_exam_metadata(exam_to_delete))
        except Exception as rollback_error:
            print(f"Nie udało się przywrócić wektorów dla badania {exam_id}: {type(rollback_error).__name__}")
        raise

    return {
        "status": "success",
        "message": "Badanie usunięto z pliku JSON i bazy wektorowej.",
        "deleted_id": exam_id,
    }
