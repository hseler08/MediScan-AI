import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function LoadingIndicator() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="small"
        color="#285C4D"
      />

      <Text style={styles.loadingText}>
        Analizuję dokumenty medyczne...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },

  loadingText: {
    marginLeft: 8,
    color: '#285C4D',
    fontSize: 14,
    fontWeight: '600',
  },
});