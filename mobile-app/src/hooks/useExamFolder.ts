import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { deleteExam, getExams } from '@/services/examService';
import { Exam } from '@/views/exams/types';

export default function useExamFolder(activeProfile: string) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExams = useCallback(async () => {
    setLoading(true);

    try {
      const examsData = await getExams(activeProfile);
      setExams(examsData);
    } catch (error) {
      console.error('Błąd pobierania listy badań:', error);
      Alert.alert('Błąd', 'Nie udało się pobrać folderu badań.');
    } finally {
      setLoading(false);
    }
  }, [activeProfile]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const confirmDeleteExam = (examId: string, onDeleted?: () => void) => {
    Alert.alert(
      'Usuń badanie',
      'Czy na pewno chcesz trwale usunąć to badanie z folderu i bazy wektorowej?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExam(examId);
              setExams((previousExams) =>
                previousExams.filter((exam) => exam.id !== examId)
              );
              onDeleted?.();
            } catch (error) {
              console.error('Błąd usuwania badania:', error);
              Alert.alert(
                'Błąd',
                'Nie udało się usunąć badania z serwera.'
              );
            }
          },
        },
      ]
    );
  };

  return {
    exams,
    loading,
    confirmDeleteExam,
  };
}
