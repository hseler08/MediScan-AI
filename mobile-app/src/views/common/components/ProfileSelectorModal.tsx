
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import {
  AVAILABLE_PROFILES,
  getInitialForProfile,
} from '../../chat/utils/profileUtils';

import type { ProfileName } from '../../chat/types/chat.types';

interface ProfileSelectorModalProps {
  visible: boolean;
  selectedProfile: ProfileName;
  onSelectProfile: (profile: ProfileName) => void;
  onClose: () => void;
}

export default function ProfileSelectorModal({
  visible,
  selectedProfile,
  onSelectProfile,
  onClose,
}: ProfileSelectorModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.modalHeaderRow}>
            <Text style={styles.modalTitle}>
              Wybierz profil pacjenta
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Feather
                name="x"
                size={20}
                color="#4A5568"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>
            Przełącz osobę, aby zobaczyć jej wyniki badań:
          </Text>

          {AVAILABLE_PROFILES.map((prof) => (
            <TouchableOpacity
              key={prof}
              style={[
                styles.profileOptionItem,
                selectedProfile === prof &&
                  styles.profileOptionActive,
              ]}
              onPress={() => {
                onSelectProfile(prof);
                onClose();
              }}
            >
              <View style={styles.profileOptionCircle}>
                <Text style={styles.profileOptionInitial}>
                  {getInitialForProfile(prof)}
                </Text>
              </View>

              <Text
                style={[
                  styles.profileOptionText,
                  selectedProfile === prof &&
                    styles.profileOptionTextActive,
                ]}
              >
                {prof} {prof === 'Ja' ? '(Hanna)' : ''}
              </Text>

              {selectedProfile === prof && (
                <Feather
                  name="check"
                  size={18}
                  color="#285C4D"
                  style={{ marginLeft: 'auto' }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    elevation: 10,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A202C',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 16,
  },
  profileOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  profileOptionActive: {
    backgroundColor: 'rgba(203, 230, 199, 0.35)',
    borderColor: '#285C4D',
  },
  profileOptionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#285C4D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileOptionInitial: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  profileOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
  },
  profileOptionTextActive: {
    color: '#285C4D',
    fontWeight: '700',
  },
});
