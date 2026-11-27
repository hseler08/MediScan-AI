import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

interface UploadSubmitButtonProps {
  isSubmitting: boolean;
  hasFiles: boolean;
  onPress: () => void;
}

export default function UploadSubmitButton({
  isSubmitting,
  hasFiles,
  onPress,
}: UploadSubmitButtonProps) {
  const disabled = isSubmitting || !hasFiles;

  return (
    <TouchableOpacity
      style={[
        styles.submitButton,
        !hasFiles && styles.submitButtonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      {isSubmitting ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator
            color="#FFFFFF"
            size="small"
          />

          <Text style={styles.submitButtonText}>
            {' '}Analizowanie i zapisywanie...
          </Text>
        </View>
      ) : (
        <Text style={styles.submitButtonText}>
          Przeanalizuj i zapisz do bazy
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#285C4D',
    borderRadius: 22,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  submitButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});