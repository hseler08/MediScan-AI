import { Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MediaFile } from './imageService';

export async function pickPdfDocument(): Promise<MediaFile | null> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf'],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      return {
        uri: file.uri,
        name: file.name,
        type: 'application/pdf',
      };
    }
    return null;
  } catch (error) {
    Alert.alert('Błąd', 'Nie udało się wybrać pliku PDF.');
    return null;
  }
}