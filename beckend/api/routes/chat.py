from fastapi import APIRouter

from beckend.schemas.chat import ChatRequest
from beckend.services.chat_service import get_chat_history, chat_with_assistant

router = APIRouter(tags=["Chat"])


@router.get("/chat-history")
def read_chat_history(profile: str = "Ja"):
    return get_chat_history(profile)


@router.post("/chat")
def send_chat_message(req: ChatRequest):
    return chat_with_assistant(req)
