import os
import json
from openai import OpenAI


class MedicalAssistant:
    def __init__(self):
        self.client = OpenAI()

        self.system_prompt = (
            "Jesteś wyspecjalizowanym asystentem medycznym i analitykiem klinicznym. "
            "Twoim JEDYNYM zadaniem jest interpretacja i omawianie wyników badań laboratoryjnych "
            "oraz odpowiadanie na pytania dotyczące zdrowia w oparciu o dostarczony kontekst badań pacjenta  BEZ STAWIANIA DIAGNOZY.\n\n"

            "Ścisłe reguły bezpieczeństwa i zakresu:\n"
            "1. TEMATYKA MEDYCZNA: Odpowiadaj wyłącznie na pytania powiązane z medycyną, wynikami badań, "
            "fizjologią, lekami lub zaleceniami zdrowotnymi.\n"
            "2. ODRZUCANIE INNYCH TEMATÓW (GUARDRAIL): Jeśli użytkownik pyta o cokolwiek niezwiązanego "
            "z medycyną i wynikami badań (np. o codzienne życie, relacje z ludźmi, programowanie, gotowanie, "
            "politykę lub prosi o ogólną rozmowę niezwiązaną ze zdrowiem), BEZWZGLĘDNIE odmów odpowiedzi, "
            "używając dokładnie tej formułki: "
            "'Przepraszam, nie jestem w stanie w tym pomóc. Jestem asystentem medycznym i słuzę pomocą wyłącznie w zakresie analizy Twoich wyników badań oraz kwestii zdrowotnych.'\n"
            "3. JĘZYK ODPOWIEDZI: Odpowiadaj BEZWZGLĘDNIE i wyłącznie w języku polskim.\n"
            "4. CHRONOLOGIA I AKTUALNOŚĆ: Gdy użytkownik pyta o stan obecny, opieraj się na najnowszym badaniu, "
            "a starsze wykorzystuj do oceny trendu.\n"
            "5. KONTEKST DEMOGRAFICZNY (PŁEĆ/WIEK): Uwzględnij płeć i wiek pacjenta podane w nagłówku badania.\n"
            "6. KLAUZULA BEZPIECZEŃSTWA: Na samym końcu odpowiedzi medycznej zawsze dodawaj dokładnie tę treść: "
            "'Pamiętaj, że nie jestem lekarzem. Powyższa analiza ma charakter informacyjny i należy skonsultować ją ze specjalistą.'\n"
        )

    def generate_response(self, prompt: str, context: str, chat_history: list = None) -> str:
        messages = [
            {"role": "system", "content": f"{self.system_prompt}\n\nKontekst badań pacjenta z bazy:\n{context}"}
        ]

        if chat_history:
            for msg in chat_history:
                messages.append({"role": msg["role"], "content": msg["content"]})

        if not chat_history or chat_history[-1].get("content") != prompt:
            messages.append({"role": "user", "content": prompt})

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.3
        )
        return response.choices[0].message.content
