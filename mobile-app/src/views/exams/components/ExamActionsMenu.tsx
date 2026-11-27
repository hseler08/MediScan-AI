import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Exam } from '../types';

interface ExamActionsMenuProps {
  exam: Exam | null;
  onClose: () => void;
  onPreview: (exam: Exam) => void;
  onDelete: (examId: string) => void;
}

export default function ExamActionsMenu({
  exam,
  onClose,
  onPreview,
  onDelete,
}: ExamActionsMenuProps) {
  return (
    <Modal
      visible={!!exam}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.menuOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.menuBox}>
          <Text style={styles.menuTitle}>
            Badanie z dnia {exam?.exam_date}
          </Text>

          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => {
              if (exam) {
                onPreview(exam);
              }
            }}
          >
            <Feather
              name="eye"
              size={18}
              color="#285C4D"
              style={{ marginRight: 12 }}
            />
            <Text style={styles.menuOptionText}>
              Otwórz podgląd wyników
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuOption, styles.menuOptionDanger]}
            onPress={() => {
              if (exam) {
                onDelete(exam.id);
              }
            }}
          >
            <Feather
              name="trash-2"
              size={18}
              color="#E53E3E"
              style={{ marginRight: 12 }}
            />
            <Text style={styles.menuOptionDangerText}>
              Usuń plik z bazy
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  menuBox: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A365D',
    marginBottom: 14,
    textAlign: 'center',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#F7FAFC',
    marginBottom: 8,
  },
  menuOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  menuOptionDanger: {
    backgroundColor: '#FFF5F5',
  },
  menuOptionDangerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E53E3E',
  },
});
