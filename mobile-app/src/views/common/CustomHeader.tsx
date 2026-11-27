
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HeaderBackButton from './components/HeaderBackButton';
import HeaderAvatar from './components/HeaderAvatar';
import ProfileSelectorModal from './components/ProfileSelectorModal';

import { getInitialForProfile } from '../chat/utils/profileUtils';

import type { ProfileName } from '../chat/types/chat.types';

interface CustomHeaderProps {
  title: string;
  userInitial?: string;
  selectedProfile?: ProfileName;
  onSelectProfile?: (profile: ProfileName) => void;
  onBackPress?: () => void;
}

export default function CustomHeader({
  title,
  userInitial,
  selectedProfile = 'Ja',
  onSelectProfile,
  onBackPress,
}: CustomHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const displayInitial =
    userInitial || getInitialForProfile(selectedProfile);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.header}>
        <HeaderBackButton onPress={onBackPress} />

        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>

        <HeaderAvatar
          initial={displayInitial}
          onPress={
            onSelectProfile
              ? () => setModalVisible(true)
              : undefined
          }
        />
      </View>

      {onSelectProfile && (
        <ProfileSelectorModal
          visible={modalVisible}
          selectedProfile={selectedProfile}
          onSelectProfile={onSelectProfile}
          onClose={closeModal}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
    marginHorizontal: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A365D',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
});
