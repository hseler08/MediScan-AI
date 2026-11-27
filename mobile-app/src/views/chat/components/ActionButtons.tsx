import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

interface ActionButtonsProps {
  onImagePress: () => void;
  onPdfPress: () => void;
}

export default function ActionButtons({
  onImagePress,
  onPdfPress,
}: ActionButtonsProps) {
  return (
    <View style={styles.initialActionSection}>
      <Text style={styles.actionPromptText}>
        Wybierz źródło dokumentu, aby rozpocząć:
      </Text>

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={[styles.mainActionButton, styles.azureButton]}
          onPress={onImagePress}
          accessibilityRole="button"
        >
          <Text style={styles.azureButtonText}>
            📷 Zrób zdjęcie wyników
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainActionButton, styles.orchidButton]}
          onPress={onPdfPress}
          accessibilityRole="button"
        >
          <Text style={styles.orchidButtonText}>
            📁 Wgraj plik PDF
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  initialActionSection: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.8)',
    alignItems: 'center',
  },

  actionPromptText: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
    fontWeight: '500',
  },

  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },

  mainActionButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 24,
    alignItems: 'center',
  },

  azureButton: {
    backgroundColor: '#B4CCCF',
  },

  azureButtonText: {
    color: '#1A365D',
    fontWeight: '700',
    fontSize: 13,
  },

  orchidButton: {
    backgroundColor: '#F3B5CD',
  },

  orchidButtonText: {
    color: '#702459',
    fontWeight: '700',
    fontSize: 13,
  },
});