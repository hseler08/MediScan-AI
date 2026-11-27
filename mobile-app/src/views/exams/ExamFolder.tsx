import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import CustomHeader from '../common/CustomHeader';
import ExamListSection from './components/ExamListSection';
import ExamActionsMenu from './components/ExamActionsMenu';
import ExamPreviewModal from './components/ExamPreviewModal';
import useExamFolder from '../../hooks/useExamFolder';
import { Exam } from './types';

interface ExamFolderViewProps {
  selectedProfile?: string;
  onSelectProfile?: (profile: string) => void;
  onBack?: () => void;
}

export default function ExamFolderView({
  selectedProfile: externalProfile,
  onSelectProfile: externalSetProfile,
  onBack,
}: ExamFolderViewProps) {
  // Jeśli rodzic nie przekazał profilu, folder sam zarządza stanem profilu.
  const [internalProfile, setInternalProfile] = useState<string>('Ja');
  const activeProfile = externalProfile ?? internalProfile;
  const handleProfileChange = externalSetProfile ?? setInternalProfile;

  const { exams, loading, confirmDeleteExam } = useExamFolder(activeProfile);

  // Stany dla podglądu badania oraz menu 3 kropek.
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [menuExam, setMenuExam] = useState<Exam | null>(null);

  const openPreview = (exam: Exam) => {
    setMenuExam(null);
    setSelectedExam(exam);
    setPreviewModalVisible(true);
  };

  const handleDeleteExam = (examId: string) => {
    setMenuExam(null);
    confirmDeleteExam(examId, () => setPreviewModalVisible(false));
  };

  return (
    <LinearGradient
      colors={['#CBE6C7', '#B4CCCF', '#F3B5CD', '#FFC49B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.safeArea}>
        <CustomHeader
          title={`Folder badań (${activeProfile})`}
          selectedProfile={activeProfile}
          onSelectProfile={handleProfileChange}
          onBackPress={onBack}
        />

        <ExamListSection
          exams={exams}
          loading={loading}
          activeProfile={activeProfile}
          onSelectExam={openPreview}
          onOpenMenu={setMenuExam}
        />
      </View>

      <ExamActionsMenu
        exam={menuExam}
        onClose={() => setMenuExam(null)}
        onPreview={openPreview}
        onDelete={handleDeleteExam}
      />

      <ExamPreviewModal
        exam={selectedExam}
        visible={previewModalVisible}
        onClose={() => setPreviewModalVisible(false)}
        onDelete={handleDeleteExam}
      />
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
});
