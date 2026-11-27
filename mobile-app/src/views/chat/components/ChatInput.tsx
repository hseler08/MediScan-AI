import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ChatInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  selectedProfile: string;
}

export default function ChatInput({
  value,
  onChangeText,
  onSend,
  selectedProfile,
}: ChatInputProps) {
  const isSendDisabled = !value.trim();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={`Zapytaj o wyniki dla: ${selectedProfile}...`}
        placeholderTextColor="#718096"
        value={value}
        onChangeText={onChangeText}
        multiline
      />

      <TouchableOpacity
        style={[
          styles.sendButton,
          isSendDisabled && styles.sendButtonDisabled,
        ]}
        onPress={onSend}
        disabled={isSendDisabled}
        accessibilityRole="button"
      >
        <Text style={styles.sendButtonText}>
          Wyślij
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.8)',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    fontSize: 15,
    color: '#1A202C',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    maxHeight: 100,
  },

  sendButton: {
    backgroundColor: '#285C4D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginLeft: 8,
  },

  sendButtonDisabled: {
    backgroundColor: '#CBD5E0',
  },

  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});