// Plik: views/upload/useAddExamLogic.ts
import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import axios from 'axios';
import { pickImagesFromGallery, startMultiCameraSession, MediaFile } from '../../services/imageService';
import { pickPdfDocument } from '../../services/pdfService';

// UPEWNIJ SIĘ, ŻE MASZ TU SWOJE IP (192.168.1.30)
const API_URL = 'http://192.168.1.34:8000';

export type GenderType = 'Kobieta' | 'Mężczyzna';

export interface PdfFile {
  uri: string;
  name: string;
  mimeType?: string;
}

// Predefiniowane profile z domyślną płcią i wiekiem (możesz zmienić liczby pod siebie!)
const DEFAULT_PROFILES: Record<string, { gender: GenderType; age: string }> = {
  Ja: { gender: 'Kobieta', age: '22' },
  Gość1: { gender: 'Kobieta', age: '50' },
  Gość2: { gender: 'Kobieta', age: '75' },
  Gość3: { gender: 'Mężczyzna', age: '52' },
};

export function useAddExamLogic(onSuccessClose: () => void) {
  const today = new Date().toISOString().split('T')[0];

  const [examDate, setExamDate] = useState<string>(today);
  const [profileName, setProfileName] = useState<string>('Ja');
  const [gender, setGender] = useState<GenderType>('Kobieta');
  const [age, setAge] = useState<string>('22');

  const [selectedImages, setSelectedImages] = useState<MediaFile[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<PdfFile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const quickProfiles = Object.keys(DEFAULT_PROFILES);

  // Kliknięcie w pigułkę profilu automatycznie ustawia też płeć i wiek!
  const handleSelectProfile = (name: string) => {
    setProfileName(name);
    if (DEFAULT_PROFILES[name]) {
      setGender(DEFAULT_PROFILES[name].gender);
      setAge(DEFAULT_PROFILES[name].age);
    }
  };

  const handlePickPdf = async () => {
    try {
      const pdf = await pickPdfDocument();
      if (pdf) {
        setSelectedImages([]);
        setSelectedPdf({
          uri: pdf.uri,
          name: pdf.name || 'badanie.pdf',
          mimeType: (pdf as any).type || (pdf as any).mimeType || 'application/pdf',
        });
      }
    } catch (error) {
      console.error('Błąd wyboru PDF:', error);
      Alert.alert('Błąd', 'Nie udało się wybrać pliku PDF.');
    }
  };

  const handlePickGallery = async () => {
    try {
      const images = await pickImagesFromGallery();
      if (images && images.length > 0) {
        setSelectedPdf(null);
        setSelectedImages((prev) => [...prev, ...images]);
      }
    } catch (error) {
      console.error('Błąd wyboru z galerii:', error);
      Alert.alert('Błąd', 'Nie udało się wybrać zdjęć z galerii.');
    }
  };

  const handleOpenCamera = async () => {
    try {
      const photos = await startMultiCameraSession();
      if (photos && photos.length > 0) {
        setSelectedPdf(null);
        setSelectedImages((prev) => [...prev, ...photos]);
      }
    } catch (error) {
      console.error('Błąd aparatu:', error);
      Alert.alert('Błąd', 'Nie udało się zrobić zdjęć.');
    }
  };

  const clearFiles = () => {
    setSelectedImages([]);
    setSelectedPdf(null);
  };

  const handleSubmitExam = async () => {
    if (!profileName.trim()) {
      Alert.alert('Brak danych', 'Wpisz lub wybierz, czyje to są badania.');
      return;
    }

    const parsedAge = parseInt(age.trim(), 10);
    if (!age.trim() || isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      Alert.alert('Błędny wiek', 'Podaj prawidłowy wiek pacjenta (1–120 lat).');
      return;
    }

    if (!examDate.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(examDate.trim())) {
      Alert.alert('Błędna data', 'Podaj datę badania w formacie RRRR-MM-DD.');
      return;
    }

    if (!selectedPdf && selectedImages.length === 0) {
      Alert.alert('Brak pliku', 'Dodaj plik PDF lub przynajmniej jedno zdjęcie wyników badań.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('profile', profileName.trim());
      formData.append('exam_date', examDate.trim());
      formData.append('gender', gender);
      formData.append('age', age.trim());

      if (selectedPdf) {
        formData.append('file_type', 'pdf');
        formData.append('files', {
          uri: Platform.OS === 'ios' ? selectedPdf.uri.replace('file://', '') : selectedPdf.uri,
          name: selectedPdf.name || 'badanie.pdf',
          type: selectedPdf.mimeType || 'application/pdf',
        } as any);
      } else {
        formData.append('file_type', 'images');
        selectedImages.forEach((img: any, index) => {
          formData.append('files', {
            uri: Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri,
            name: img.name || img.fileName || `strona_${index + 1}.jpg`,
            type: img.type || img.mimeType || 'image/jpeg',
          } as any);
        });
      }

      await axios.post(`${API_URL}/upload-exam`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert(
        'Sukces!',
        `Badania dla profilu "${profileName}" (${age} l., ${examDate}) zostały zapisane w bazie.`
      );

      clearFiles();
      onSuccessClose();
    } catch (error: any) {
      console.error('Błąd wysyłania badań:', error);
      Alert.alert(
        'Błąd zapisu',
        'Upewnij się, że dodajesz poprawny plik'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}