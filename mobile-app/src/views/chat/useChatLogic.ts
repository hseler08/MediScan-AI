import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';

import type {
  ChatMessage,
  ChatHistoryResponse,
  ChatResponse,
  ProfileName,
} from './types/chat.types';

import { AVAILABLE_PROFILES } from './utils/profileUtils';

// Adres backendu
const API_URL = 'http://192.168.1.34:8000';

// Normalizacja wiadomości otrzymanych z backendu
function normalizeMessages(
  messages: ChatHistoryResponse['messages'],
): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages.map((message, index) => ({
    id: message.id != null
      ? String(message.id)
      : `message-${Date.now()}-${index}`,

    role: message.role,
    content: message.content,
  }));
}

export function useChatLogic() {
  // Stan wiadomości
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Stan pola tekstowego
  const [inputText, setInputText] = useState<string>('');

  // Stan ładowania
  const [loading, setLoading] = useState<boolean>(false);

  // Aktualnie wybrany profil
  const [selectedProfile, setSelectedProfile] =
    useState<ProfileName>('Ja');

  // Referencja do listy wiadomości
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  // Referencja do aktualnie wybranego profilu
  const selectedProfileRef = useRef<ProfileName>(selectedProfile);

  selectedProfileRef.current = selectedProfile;

  // Pobieranie historii czatu dla wybranego profilu
  const fetchChatHistory = useCallback(
    async (profile: ProfileName, signal: AbortSignal) => {
      try {
        const response = await axios.get<ChatHistoryResponse>(
          `${API_URL}/chat-history`,
          {
            params: { profile },
            signal,
          },
        );

        // Sprawdzamy, czy użytkownik nadal korzysta z tego profilu
        if (selectedProfileRef.current !== profile) {
          return;
        }

        setMessages(
          normalizeMessages(response.data?.messages),
        );

      } catch (error) {
        if (
          axios.isCancel(error) ||
          (error instanceof Error && error.name === 'CanceledError')
        ) {
          return;
        }

        console.error(
          'Błąd pobierania historii czatu:',
          error,
        );

        if (selectedProfileRef.current === profile) {
          setMessages([]);
        }
      }
    },
    [],
  );

  // Pobieranie historii po zmianie profilu
  useEffect(() => {
    const controller = new AbortController();

    void fetchChatHistory(
      selectedProfile,
      controller.signal,
    );

    return () => {
      controller.abort();
    };
  }, [selectedProfile, fetchChatHistory]);

  // Wysyłanie wiadomości
  const sendMessage = useCallback(async () => {
    const trimmedMessage = inputText.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const profileForRequest = selectedProfile;

    const userMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      role: 'user',
      content: trimmedMessage,
    };

    // Czyszczenie pola tekstowego
    setInputText('');

    // Dodanie wiadomości użytkownika
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response = await axios.post<ChatResponse>(
        `${API_URL}/chat`,
        {
          message: trimmedMessage,
          profile: profileForRequest,
        },
      );

      // Nie aktualizujemy wiadomości, jeśli zmienił się profil
      if (selectedProfileRef.current !== profileForRequest) {
        return;
      }

if (Array.isArray(response.data?.messages) && response.data.messages.length > 0) {
        setMessages(
          normalizeMessages(response.data.messages),
        );
      }
      // Backend zwrócił pojedynczą odpowiedź (np. powiadomienie o braku badań)
      else if (response.data?.reply) {
        const assistantMessage: ChatMessage = {
          id: `local-${Date.now()}-assistant`,
          role: 'assistant',
          content: response.data.reply,
        };

        setMessages((currentMessages) => [
          ...currentMessages,
          assistantMessage,
        ]);
      }

    } catch (error) {
      console.error('Błąd czatu:', error);

    } finally {
      setLoading(false);
    }
  }, [inputText, loading, selectedProfile]);

  return {
    messages,
    inputText,
    setInputText,
    loading,
    flatListRef,
    sendMessage,
    selectedProfile,
    setSelectedProfile,
    availableProfiles: AVAILABLE_PROFILES,
  };
}