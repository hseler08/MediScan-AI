import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AssistantBannerProps {
  selectedProfile: string;
  onOpenChat: () => void;
}

export default function AssistantBanner({
  selectedProfile,
  onOpenChat,
}: AssistantBannerProps) {
  return (
    <View style={styles.aiBanner}>
      <Text style={styles.aiAssistantTitle}>
        MediScan AI Assistant ({selectedProfile})
      </Text>

      <Text style={styles.aiBannerText}>
        Twój wskaźnik zdrowia zmienił się po ostatniej aktualizacji. Sprawdź
        szczegóły wyników dla profilu {selectedProfile}.
      </Text>

      <TouchableOpacity
        style={styles.aiChatButton}
        activeOpacity={0.85}
        onPress={onOpenChat}
      >
        <Text style={styles.aiChatButtonText}>Porozmawiajmy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  aiBanner: {
    backgroundColor: 'rgba(243, 181, 205, 0.25)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(243, 181, 205, 0.5)',
  },
  aiAssistantTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#285C4D',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  aiBannerText: {
    fontSize: 14,
    color: '#2D3748',
    lineHeight: 20,
    marginBottom: 12,
    fontWeight: '500',
  },
  aiChatButton: {
    backgroundColor: '#285C4D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  aiChatButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
