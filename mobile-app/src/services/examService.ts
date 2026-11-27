import axios from 'axios';
import { Exam } from '@/views/exams/types';

const API_URL = 'http://192.168.1.34:8000';

export const getExams = async (profile: string): Promise<Exam[]> => {
  const response = await axios.get(`${API_URL}/exams`, {
    params: { profile },
  });

  if (response.data && response.data.exams) {
    return response.data.exams as Exam[];
  }

  return [];
};

export const deleteExam = async (examId: string): Promise<void> => {
  await axios.delete(`${API_URL}/exams/${examId}`);
};
