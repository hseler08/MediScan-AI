import React from 'react';

import {
  Modal,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useAddExamLogic } from './useAddExamLogic';

import UploadHeader from './components/UploadHeader';
import PatientInfoSection from './components/PatientInfoSection';
import FilePickerSection from './components/FilePickerSection';
import SelectedFileBanner from './components/SelectedFileBanner';
import UploadSubmitButton from './components/UploadSubmitButton';

interface AddExamModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddExamModal({
  visible,
  onClose,
}: AddExamModalProps) {
  const {
    examDate,
    setExamDate,
    profileName,
    setProfileName,
    gender,
    setGender,
    age,
    setAge,
    quickProfiles,
    handleSelectProfile,
    selectedImages,
    selectedPdf,
    isSubmitting,
    handlePickPdf,
    handlePickGallery,
    handleOpenCamera,
    clearFiles,
    handleSubmitExam,
  } = useAddExamLogic(onClose);

  const hasPdf = !!selectedPdf;
  const hasImages = selectedImages.length > 0;
  const hasFiles = hasPdf || hasImages;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalCard}>
          <UploadHeader onClose={onClose} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <PatientInfoSection
              profileName={profileName}
              setProfileName={setProfileName}
              quickProfiles={quickProfiles}
              handleSelectProfile={handleSelectProfile}
              examDate={examDate}
              setExamDate={setExamDate}
              age={age}
              setAge={setAge}
              gender={gender}
              setGender={setGender}
            />

            <FilePickerSection
              hasPdf={hasPdf}
              hasImages={hasImages}
              onPickPdf={handlePickPdf}
              onPickGallery={handlePickGallery}
              onOpenCamera={handleOpenCamera}
            />

            <SelectedFileBanner
              selectedPdf={selectedPdf}
              selectedImages={selectedImages}
              onClear={clearFiles}
            />

            <UploadSubmitButton
              isSubmitting={isSubmitting}
              hasFiles={hasFiles}
              onPress={handleSubmitExam}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 32, 44, 0.45)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    maxHeight: '88%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },
});