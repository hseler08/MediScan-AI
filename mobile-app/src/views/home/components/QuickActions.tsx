import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface QuickActionsProps {
  onOpenFolder: () => void;
  onOpenChat: () => void;
}

export default function QuickActions({
  onOpenFolder,
  onOpenChat,
}: QuickActionsProps) {
  return (
    <View style={styles.quickActionsContainer}>
      <TouchableOpacity
        style={styles.primaryActionButton}
        activeOpacity={0.85}
        onPress={onOpenFolder}
      >
        <Text style={styles.primaryActionText}>Moje badania</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconActionButton} activeOpacity={0.7}>
        <MaterialCommunityIcons
          name="stethoscope"
          size={18}
          color="#285C4D"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconActionButton}
        activeOpacity={0.7}
        onPress={onOpenFolder}
      >
        <Feather name="file-text" size={18} color="#285C4D" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconActionButton}
        activeOpacity={0.7}
        onPress={onOpenChat}
      >
        <Feather name="send" size={18} color="#285C4D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quickActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  primaryActionButton: {
    backgroundColor: '#285C4D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    shadowColor: '#285C4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  iconActionButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 224, 0.6)',
  },
});
