import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

interface UploadHeaderProps {
  onClose: () => void;
}

export default function UploadHeader({
  onClose,
}: UploadHeaderProps) {
  return (
    <>
      <View style={styles.handleBar} />

      <View style={styles.headerRow}>
        <Text style={styles.modalTitle}>
          Dodaj wyniki badań
        </Text>

        <TouchableOpacity
          onPress={onClose}
          style={styles.closeBtn}
        >
          <Feather
            name="x"
            size={20}
            color="#4A5568"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  handleBar: {
    width: 42,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A202C',
  },

  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});