import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ChatMessage } from '../types/chat.types';
import AssistantMessage from './AssistantMessage';

interface ChatBubbleProps {
  item: ChatMessage;
}

export default function ChatBubble({ item }: ChatBubbleProps) {
  const isUserMessage = item.role === 'user';

  return (
    <View
      style={[
        styles.messageRow,
        isUserMessage ? styles.userRow : styles.aiRow,
      ]}
    >
      {!isUserMessage && (
        <View style={styles.avatarRobot}>
          <Text style={styles.avatarEmoji}>🤖</Text>
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUserMessage ? styles.userBubble : styles.aiBubble,
        ]}
      >
        {isUserMessage ? (
          <Text style={styles.userBubbleText}>
            {item.content}
          </Text>
        ) : (
          <AssistantMessage content={item.content} />
        )}
      </View>

      {isUserMessage && (
        <View style={styles.avatarUser}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 8,
  },

  aiRow: {
    justifyContent: 'flex-start',
  },

  userRow: {
    justifyContent: 'flex-end',
  },

  avatarRobot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#8FB8A7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  avatarUser: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3B5CD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  avatarEmoji: {
    fontSize: 16,
  },

  bubble: {
    padding: 16,
    borderRadius: 20,
    maxWidth: '78%',
    backgroundColor: '#FFFFFF',
  },

  userBubble: {
    borderBottomRightRadius: 4,
    borderWidth: 2,
    borderColor: '#F3B5CD',
  },

  aiBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 2,
    borderColor: '#8FB8A7',
  },

  userBubbleText: {
    color: '#1A202C',
    fontSize: 15,
    lineHeight: 22,
  },
});