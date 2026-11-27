import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { healthSystems } from '../data/healthSystems';

export default function HealthSystemsSection() {
  return (
    <>
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionTitle}>System zdrowia</Text>
        <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.7}>
          <Text style={styles.dropdownButtonText}>All</Text>
          <Feather
            name="chevron-down"
            size={14}
            color="#285C4D"
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>

      {healthSystems.map((item) => (
        <View key={item.id} style={styles.systemCard}>
          <View style={styles.systemCardHeader}>
            <View
              style={[
                styles.systemIconBox,
                { backgroundColor: item.color },
              ]}
            >
              <Feather name="heart" size={14} color="#285C4D" />
            </View>

            <Text style={styles.systemName}>{item.name}</Text>

            <Text style={styles.systemScoreText}>
              <Text style={styles.systemScoreBold}>{item.score}</Text> /{' '}
              {item.maxScore}
            </Text>
          </View>

          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${(item.score / item.maxScore) * 100}%`,
                  backgroundColor: '#285C4D',
                },
              ]}
            />
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A202C',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 224, 0.6)',
  },
  dropdownButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#285C4D',
  },
  systemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  systemCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  systemIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  systemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
    flex: 1,
  },
  systemScoreText: {
    fontSize: 12,
    color: '#718096',
  },
  systemScoreBold: {
    fontWeight: '700',
    color: '#285C4D',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});
