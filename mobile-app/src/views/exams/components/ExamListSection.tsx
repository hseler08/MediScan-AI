import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Exam } from '../types';

interface ExamListSectionProps {
  exams: Exam[];
  loading: boolean;
  activeProfile: string;
  onSelectExam: (exam: Exam) => void;
  onOpenMenu: (exam: Exam) => void;
}

export default function ExamListSection({
  exams,
  loading,
  activeProfile,
  onSelectExam,
  onOpenMenu,
}: ExamListSectionProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Zaimportowane pliki ({activeProfile})
        </Text>
        <Text style={styles.sectionCount}>{exams.length}</Text>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#285C4D" />
          <Text style={styles.loadingText}>Wczytywanie badań...</Text>
        </View>
      ) : exams.length === 0 ? (
        <View style={styles.centerContainer}>
          <Feather name="folder" size={48} color="#A0AEC0" />
          <Text style={styles.emptyText}>
            Brak zapisanych badań dla profilu: {activeProfile}
          </Text>
          <Text style={styles.emptySubtext}>
            Dodaj nowy plik zielonym przyciskiem "+" na dole ekranu.
          </Text>
        </View>
      ) : (
        <FlatList
          data={exams}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.examCard}
              activeOpacity={0.8}
              onPress={() => onSelectExam(item)}
            >
              <View style={styles.examIconContainer}>
                <Feather name="file-text" size={22} color="#285C4D" />
              </View>

              <View style={styles.examInfo}>
                <Text style={styles.examDateText}>
                  Zapisane badanie z dnia {item.exam_date}
                </Text>
                <Text style={styles.examMetaText} numberOfLines={1}>
                  Profil: {item.profile} • {item.gender}, {item.age} lat •
                  Kliknij, aby podejrzeć
                </Text>
              </View>

              <TouchableOpacity
                style={styles.dotsButton}
                onPress={() => onOpenMenu(item)}
              >
                <Feather
                  name="more-vertical"
                  size={20}
                  color="#4A5568"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 32,
    marginHorizontal: 8,
    marginTop: 4,
    overflow: 'hidden',
    marginBottom: Platform.OS === 'ios' ? 95 : 85,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A365D',
  },
  sectionCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#285C4D',
    backgroundColor: '#CBE6C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#285C4D',
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#4A5568',
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 6,
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  examCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  examIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(40, 92, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  examInfo: {
    flex: 1,
  },
  examDateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 3,
  },
  examMetaText: {
    fontSize: 12,
    color: '#718096',
  },
  dotsButton: {
    padding: 8,
    marginLeft: 4,
  },
});
