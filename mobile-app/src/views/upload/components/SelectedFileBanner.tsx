import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import type { MediaFile } from '../../../services/imageService';
import type { PdfFile } from '../types/upload.types';

interface SelectedFileBannerProps {
  selectedPdf: PdfFile | null;
  selectedImages: MediaFile[];
  onClear: () => void;
}

export default function SelectedFileBanner({
  selectedPdf,
  selectedImages,
  onClear,
}: SelectedFileBannerProps) {
  const hasPdf = !!selectedPdf;
  const hasImages = selectedImages.length > 0;

  if (!hasPdf && !hasImages) {
    return null;
  }

  return (
    <View style={styles.selectedFileBanner}>
      <View style={styles.selectedFileInfo}>
        <Feather
          name={hasPdf ? 'file-text' : 'check-circle'}
          size={18}
          color="#285C4D"
        />

        <Text
          style={styles.selectedFileText}
          numberOfLines={1}
        >
          {hasPdf
            ? `PDF: ${selectedPdf?.name}`
            : `Wybrano zdjęć: ${selectedImages.length} (możesz dobrać więcej)`}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onClear}
        style={styles.clearBtn}
      >
        <Feather
          name="trash-2"
          size={16}
          color="#E53E3E"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedFileBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(203, 230, 199, 0.45)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#CBE6C7',
  },

  selectedFileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },

  selectedFileText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#285C4D',
    marginLeft: 8,
    flex: 1,
  },

  clearBtn: {
    padding: 4,
  },
});