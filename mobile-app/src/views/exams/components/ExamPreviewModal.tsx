import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Exam } from '../types';

interface ExamPreviewModalProps {
  exam: Exam | null;
  visible: boolean;
  onClose: () => void;
  onDelete: (examId: string) => void;
}

export default function ExamPreviewModal({
  exam,
  visible,
  onClose,
  onDelete,
}: ExamPreviewModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.previewOverlay}>
        <View style={styles.previewContent}>
          <View style={styles.previewHeaderRow}>
            <Text style={styles.previewTitle}>
              Badanie z dnia {exam?.exam_date}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={22} color="#4A5568" />
            </TouchableOpacity>
          </View>

          {exam && (
            <>
              <Text style={styles.previewDateInfo}>
                Pacjent: {exam.profile} | Wiek: {exam.age} lat | Płeć:{' '}
                {exam.gender}
              </Text>

              <ScrollView style={styles.previewScroll}>
                <Text style={styles.previewMarkdownText}>
                  {exam.clean_markdown}
                </Text>
              </ScrollView>

              <TouchableOpacity
                style={styles.previewDeleteButton}
                onPress={() => onDelete(exam.id)}
              >
                <Feather
                  name="trash-2"
                  size={16}
                  color="#FFFFFF"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.previewDeleteButtonText}>
                  Usuń to badanie
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  previewContent: {
    height: '82%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  previewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A365D',
  },
  previewDateInfo: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 16,
    fontWeight: '600',
  },
  previewScroll: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  previewMarkdownText: {
    fontSize: 14,
    color: '#2D3748',
    lineHeight: 20,
  },
  previewDeleteButton: {
    flexDirection: 'row',
    backgroundColor: '#E53E3E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  previewDeleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
