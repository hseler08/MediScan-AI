import type { RefObject } from 'react';
import type { FlatList } from 'react-native';

export type ChatRole = 'user' | 'assistant';

export type ProfileName = 'Ja' | 'Gość1' | 'Gość2' | 'Gość3';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface ChatHistoryResponse {
  messages?: Array<{
    id?: string | number;
    role: ChatRole;
    content: string;
  }>;
}

export interface ChatResponse extends ChatHistoryResponse {
  reply?: string;
}

export type ChatListRef = RefObject<FlatList<ChatMessage> | null>;