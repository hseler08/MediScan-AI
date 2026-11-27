import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

load_dotenv(override=True)


class PatientDatabase:
    def __init__(self, db_path="chroma_db", collection_name="patient_records"):
        if not os.getenv("OPENAI_API_KEY"):
            raise ValueError("Missing OPENAI_API_KEY in .env file!")

        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        self.db_path = db_path
        self.collection_name = collection_name
        self.vector_store = Chroma(
            collection_name=self.collection_name,
            embedding_function=self.embeddings,
            persist_directory=self.db_path,
        )

    def clear_database(self):
        self.vector_store.delete_collection()
        self.vector_store = Chroma(
            collection_name=self.collection_name,
            embedding_function=self.embeddings,
            persist_directory=self.db_path,
        )

    def add_documents(self, chunks: list[str], metadata: dict = None):
        if not chunks:
            return

        if metadata:
            metadatas = [dict(metadata) for _ in chunks]
            self.vector_store.add_texts(texts=chunks, metadatas=metadatas)
        else:
            self.vector_store.add_texts(texts=chunks)

    def delete_exam(self, exam_id: str):
        self.vector_store.delete(where={"exam_id": exam_id})

    def search_similar(self, query: str, profile: str = None, top_k: int = 6):
        if profile:
            return self.vector_store.similarity_search(
                query, k=top_k, filter={"profile": profile}
            )
        return self.vector_store.similarity_search(query, k=top_k)
