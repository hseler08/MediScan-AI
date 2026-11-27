
import React, { useRef } from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';

import type {
  ChatListRef,
  ChatMessage,
} from '../types/chat.types';

import ChatBubble from './ChatBubble';

interface ChatMessageListProps {
  messages: ChatMessage[];
  flatListRef: ChatListRef;
}

export default function ChatMessageList({
  messages,
  flatListRef,
}: ChatMessageListProps) {
  // Czy użytkownik znajduje się blisko końca rozmowy?
  const shouldAutoScroll = useRef(true);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.chatContainer}

      // Zapamiętujemy pozycję użytkownika podczas przewijania
      onScroll={(event) => {
        const {
          contentOffset,
          contentSize,
          layoutMeasurement,
        } = event.nativeEvent;

        const distanceFromBottom =
          contentSize.height -
          (contentOffset.y + layoutMeasurement.height);

        shouldAutoScroll.current = distanceFromBottom <= 80;
      }}

      // Przewijamy automatycznie tylko wtedy,
      // gdy użytkownik wcześniej znajdował się na dole
      onContentSizeChange={() => {
        if (shouldAutoScroll.current) {
          flatListRef.current?.scrollToEnd({
            animated: true,
          });
        }
      }}

      scrollEventThrottle={16}

      renderItem={({ item }) => (
        <ChatBubble item={item} />
      )}

      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    padding: 16,
    paddingBottom: 20,
  },
});
