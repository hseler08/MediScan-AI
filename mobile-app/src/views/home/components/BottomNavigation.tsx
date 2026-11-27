import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type HomeTab = 'home' | 'folder' | 'chat' | 'profile';

interface BottomNavigationProps {
  activeTab: HomeTab;
  onSelectTab: (tab: HomeTab) => void;
  onAddExam: () => void;
  onOpenChat: () => void;
}

export default function BottomNavigation({
  activeTab,
  onSelectTab,
  onAddExam,
  onOpenChat,
}: BottomNavigationProps) {
  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNavContent}>
        <TouchableOpacity
          onPress={() => onSelectTab('home')}
          style={styles.navItem}
        >
          <Feather
            name="heart"
            size={22}
            color={activeTab === 'home' ? '#FFFFFF' : '#A0AEC0'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectTab('folder')}
          style={styles.navItem}
        >
          <Feather
            name="folder"
            size={22}
            color={activeTab === 'folder' ? '#FFFFFF' : '#A0AEC0'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.floatingPlusButton}
          activeOpacity={0.85}
          onPress={onAddExam}
        >
          <Feather name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onOpenChat}
          style={styles.navItem}
        >
          <Feather
            name="message-square"
            size={22}
            color={activeTab === 'chat' ? '#FFFFFF' : '#A0AEC0'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectTab('profile')}
          style={styles.navItem}
        >
          <Feather
            name="user"
            size={22}
            color={activeTab === 'profile' ? '#FFFFFF' : '#A0AEC0'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  bottomNavContent: {
    flexDirection: 'row',
    backgroundColor: '#1A202C',
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  navItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingPlusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#285C4D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -22,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
