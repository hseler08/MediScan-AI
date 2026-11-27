import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

interface FilePickerSectionProps {
  hasPdf: boolean;
  hasImages: boolean;

  onPickPdf: () => void;
  onPickGallery: () => void;
  onOpenCamera: () => void;
}

export default function FilePickerSection({
  hasPdf,
  hasImages,
  onPickPdf,
  onPickGallery,
  onOpenCamera,
}: FilePickerSectionProps) {
  return (
    <View>
      <Text style={styles.label}>
        Załącz dokument{' '}
        <Text style={styles.labelSub}>
          (wybierz PDF lub zdjęcia)
        </Text>
      </Text>

      <View style={styles.uploadOptionsRow}>
        <TouchableOpacity
          style={[
            styles.uploadBox,
            hasPdf && styles.uploadBoxSelected,
            hasImages && styles.uploadBoxDisabled,
          ]}
          onPress={onPickPdf}
          disabled={hasImages}
          activeOpacity={0.7}
        >
          <Feather
            name="file-text"
            size={24}
            color={hasImages ? '#CBD5E0' : '#285C4D'}
          />

          <Text
            style={[
              styles.uploadBoxTitle,
              hasImages && styles.textDisabled,
            ]}
          >
            Plik PDF
          </Text>

          <Text style={styles.uploadBoxSub}>
            Dokument
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.uploadBox,
            hasImages && styles.uploadBoxSelected,
            hasPdf && styles.uploadBoxDisabled,
          ]}
          onPress={onPickGallery}
          disabled={hasPdf}
          activeOpacity={0.7}
        >
          <Feather
            name="image"
            size={24}
            color={hasPdf ? '#CBD5E0' : '#285C4D'}
          />

          <Text
            style={[
              styles.uploadBoxTitle,
              hasPdf && styles.textDisabled,
            ]}
          >
            Galeria
          </Text>

          <Text style={styles.uploadBoxSub}>
            Zdjęcia
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.uploadBox,
            hasImages && styles.uploadBoxSelected,
            hasPdf && styles.uploadBoxDisabled,
          ]}
          onPress={onOpenCamera}
          disabled={hasPdf}
          activeOpacity={0.7}
        >
          <Feather
            name="camera"
            size={24}
            color={hasPdf ? '#CBD5E0' : '#285C4D'}
          />

          <Text
            style={[
              styles.uploadBoxTitle,
              hasPdf && styles.textDisabled,
            ]}
          >
            Aparat
          </Text>

          <Text style={styles.uploadBoxSub}>
            Seria zdjęć
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 6,
    marginTop: 10,
  },

  labelSub: {
    fontWeight: '400',
    color: '#718096',
  },

  uploadOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 4,
  },

  uploadBox: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadBoxSelected: {
    borderColor: '#285C4D',
    backgroundColor: 'rgba(203, 230, 199, 0.3)',
  },

  uploadBoxDisabled: {
    backgroundColor: '#F7FAFC',
    borderColor: '#EDF2F7',
    opacity: 0.5,
  },

  uploadBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A202C',
    marginTop: 6,
  },

  uploadBoxSub: {
    fontSize: 11,
    color: '#718096',
    marginTop: 2,
  },

  textDisabled: {
    color: '#A0AEC0',
  },
});