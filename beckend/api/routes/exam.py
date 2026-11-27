from typing import List

from fastapi import APIRouter, UploadFile, File, Form

from beckend.services.exam_service import upload_exam, get_exams, delete_exam

router = APIRouter(tags=["Exams"])


@router.post("/upload-exam")
async def upload_exam_endpoint(
    profile: str = Form("Ja"),
    exam_date: str = Form(...),
    gender: str = Form("Kobieta"),
    age: str = Form("22"),
    file_type: str = Form(...),
    files: List[UploadFile] = File(...),
):
    return await upload_exam(
        profile=profile,
        exam_date=exam_date,
        gender=gender,
        age=age,
        file_type=file_type,
        files=files,
    )


@router.get("/exams")
def read_exams(profile: str = "Ja"):
    return get_exams(profile)


@router.delete("/exams/{exam_id}")
def remove_exam(exam_id: str):
    return delete_exam(exam_id)
