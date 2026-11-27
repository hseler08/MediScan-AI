import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import AddExamModal from '../views/upload/AddExamModal';
import CustomHeader from '../views/common/CustomHeader';
import ExamFolderView from '../views/exams/ExamFolder';

import HealthScore from '../views/home/components/HealthScore';
import QuickActions from '../views/home/components/QuickActions';
import AssistantBanner from '../views/home/components/AssistantBanner';
import HealthSystemsSection from '../views/home/components/HealthSystemsSection';
import BottomNavigation, {
  type HomeTab,
} from '../views/home/components/BottomNavigation';

export default function HomeScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<HomeTab>('home');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>('Ja');

  const openChatFromNavigation = () => {
    setActiveTab('chat');
    router.push('/chat');
  };

  return (
    <LinearGradient
      colors={['#CBE6C7', '#B4CCCF', '#F3B5CD', '#FFC49B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {activeTab === 'folder' ? (
          <View style={{ flex: 1 }}>
            <ExamFolderView
              selectedProfile={selectedProfile}
              onSelectProfile={setSelectedProfile}
              onBack={() => setActiveTab('home')}
            />
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <View style={{ marginTop: 8 }}>
              <CustomHeader
                title={`MediScan AI (${selectedProfile})`}
                selectedProfile={selectedProfile}
                onSelectProfile={setSelectedProfile}
                onBackPress={() => {}}
              />
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <HealthScore />

              <QuickActions
                onOpenFolder={() => setActiveTab('folder')}
                onOpenChat={() => router.push('/chat')}
              />

              <AssistantBanner
                selectedProfile={selectedProfile}
                onOpenChat={() => router.push('/chat')}
              />

              <HealthSystemsSection />
            </ScrollView>
          </View>
        )}

        <BottomNavigation
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onAddExam={() => setIsAddModalVisible(true)}
          onOpenChat={openChatFromNavigation}
        />

        <AddExamModal
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 48,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginHorizontal: 8,
    marginTop: 4,
    overflow: 'hidden',
    marginBottom: Platform.OS === 'ios' ? 24 : 16,
    position: 'relative',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
});