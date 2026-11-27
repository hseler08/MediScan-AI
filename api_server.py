from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from beckend.api.routes.exam import router as exam_router
from beckend.api.routes.chat import router as chat_router

app = FastAPI(title="Medical Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(exam_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {"status": "API działa poprawnie i architekturę mamy rozdzieloną!"}
