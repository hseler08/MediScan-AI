import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import type { GenderType } from '../types/upload.types';

interface PatientInfoSectionProps {
  profileName: string;
  setProfileName: (value: string) => void;

  quickProfiles: string[];
  handleSelectProfile: (name: string) => void;

  examDate: string;
  setExamDate: (value: string) => void;

  age: string;
  setAge: (value: string) => void;

  gender: GenderType;
  setGender: (value: GenderType) => void;
}

export default function PatientInfoSection({
  profileName,
  setProfileName,
  quickProfiles,
  handleSelectProfile,
  examDate,
  setExamDate,
  age,
  setAge,
  gender,
  setGender,
}: PatientInfoSectionProps) {
  return (
    <View>
      {/* Profil pacjenta */}

      <Text style={styles.label}>
        Czyje to są badania?
      </Text>

      <TextInput
        style={styles.input}
        value={profileName}
        onChangeText={setProfileName}
        placeholder="Np. Ja, Gość1, Gość2..."
        placeholderTextColor="#A0AEC0"
      />

      <View style={styles.chipsRow}>
        {quickProfiles.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              profileName === item && styles.chipActive,
            ]}
            onPress={() => handleSelectProfile(item)}
          >
            <Text
              style={[
                styles.chipText,
                profileName === item && styles.chipTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Data badania i wiek */}

      <View style={styles.twoColumnsRow}>
        <View style={{ flex: 1.6 }}>
          <Text style={styles.label}>
            Data badania
          </Text>

          <View style={styles.inputWithIcon}>
            <Feather
              name="calendar"
              size={16}
              color="#285C4D"
              style={{ marginRight: 8 }}
            />

            <TextInput
              style={styles.inputFlex}
              value={examDate}
              onChangeText={setExamDate}
              placeholder="2026-10-28"
              placeholderTextColor="#A0AEC0"
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            Wiek (lata)
          </Text>

          <View style={styles.inputWithIcon}>
            <Feather
              name="award"
              size={16}
              color="#285C4D"
              style={{ marginRight: 8 }}
            />

            <TextInput
              style={styles.inputFlex}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              maxLength={3}
              placeholder="22"
              placeholderTextColor="#A0AEC0"
            />
          </View>
        </View>
      </View>

      {/* Płeć */}

      <Text style={styles.label}>
        Płeć (dla dokładnych norm)
      </Text>

      <View style={styles.genderContainer}>
        {(['Kobieta', 'Mężczyzna'] as GenderType[]).map((item) => {
          const isActive = gender === item;

          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.genderButton,
                isActive && styles.genderButtonActive,
              ]}
              onPress={() => setGender(item)}
            >
              <Feather
                name="user"
                size={16}
                color={isActive ? '#FFFFFF' : '#285C4D'}
                style={{ marginRight: 6 }}
              />

              <Text
                style={[
                  styles.genderText,
                  isActive && styles.genderTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
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

  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1A202C',
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },

  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#EDF2F7',
  },

  chipActive: {
    backgroundColor: '#CBE6C7',
    borderWidth: 1,
    borderColor: '#285C4D',
  },

  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A5568',
  },

  chipTextActive: {
    color: '#285C4D',
    fontWeight: '700',
  },

  twoColumnsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 12,
  },

  inputFlex: {
    flex: 1,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1A202C',
  },

  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    backgroundColor: '#FFFFFF',
  },

  genderButtonActive: {
    backgroundColor: '#285C4D',
    borderColor: '#285C4D',
  },

  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#285C4D',
  },

  genderTextActive: {
    color: '#FFFFFF',
  },
});