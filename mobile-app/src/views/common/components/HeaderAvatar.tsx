
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface HeaderAvatarProps {
  initial: string;
  onPress?: () => void;
}

export default function HeaderAvatar({
  initial,
  onPress,
}: HeaderAvatarProps) {
  const content = (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        {initial}
      </Text>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3B5CD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    color: '#702459',
    fontWeight: '700',
    fontSize: 15,
  },
});
