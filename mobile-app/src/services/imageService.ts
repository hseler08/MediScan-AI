import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export interface MediaFile {
  uri: string;
  name: string;
  type: string;
}

// Wybór zdjęcia z galerii (wielokrotny)
export async function pickImagesFromGallery(): Promise<MediaFile[]> {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert('Wymagane uprawnienia', 'Musisz zezwolić na dostęp do galerii.');
    return [];
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    quality: 0.8,
  });

  if (result.canceled || !result.assets) return [];

  return result.assets.map((image, index) => ({
    uri: image.uri,
    name: image.uri.split('/').pop() || `galeria_${index}_${Date.now()}.jpg`,
    type: 'image/jpeg',
  }));
}

// Sesja aparatu z możliwością robienia wielu zdjęć pod rząd
export async function startMultiCameraSession(): Promise<MediaFile[]> {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert('Wymagane uprawnienia', 'Musisz zezwolić na dostęp do aparatu.');
    return [];
  }

  let collectedImages: MediaFile[] = [];
  let keepTaking = true;

  while (keepTaking) {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      const filename = `zdjecie_aparatu_${collectedImages.length + 1}_${Date.now()}.jpg`;
      
      collectedImages.push({
        uri: image.uri,
        name: filename,
        type: 'image/jpeg',
      });

      // Pytanie o kolejne zdjęcie (świetny UX dla pacjenta robiącego zdjęcia np. wielostronicowej morfologii)
      await new Promise((resolve) => {
        Alert.alert(
          "Zdjęcie dodane",
          `W paczce jest już ${collectedImages.length} zdjęć. Czy chcesz zrobić kolejne?`,
          [
            { text: "Wyślij teraz", onPress: () => { keepTaking = false; resolve(null); }, style: "default" },
            { text: "Zrób kolejne", onPress: () => resolve(null) }
          ],
          { cancelable: false }
        );
      });
    } else {
      keepTaking = false;
    }
  }

  return collectedImages;
}