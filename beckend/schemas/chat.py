from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    profile: str = "Ja"
