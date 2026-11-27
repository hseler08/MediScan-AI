import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import CustomHeader from '../common/CustomHeader';

import ChatMessageList from './components/ChatMessageList';
import ChatInput from './components/ChatInput';
import LoadingIndicator from './components/LoadingIndicator';

import { useChatLogic } from './useChatLogic';
import { getInitialForProfile } from './utils/profileUtils';

export default function ChatView() {
  const router = useRouter();

  const {
    messages,
    inputText,
    setInputText,
    loading,
    flatListRef,
    sendMessage,
    selectedProfile,
    setSelectedProfile,
  } = useChatLogic();

  return (
    <LinearGradient
      colors={[
        '#CBE6C7',
        '#B4CCCF',
        '#F3B5CD',
        '#FFC49B',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.safeArea}>

        {/* Nagłówek i wybór profilu */}
        <CustomHeader
          title={`MediScan AI (${selectedProfile})`}
          selectedProfile={selectedProfile}
          onSelectProfile={setSelectedProfile}
          userInitial={getInitialForProfile(selectedProfile)}
          onBackPress={() => router.back()}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.cardContainer}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? 60 : 0
          }
        >

          {/* Lista wiadomości */}
          <ChatMessageList
            messages={messages}
            flatListRef={flatListRef}
          />

          {/* Wskaźnik ładowania */}
          {loading && <LoadingIndicator />}

          {/* Pole tekstowe i wysyłanie wiadomości */}
          <ChatInput
            value={inputText}
            onChangeText={setInputText}
            onSend={sendMessage}
            selectedProfile={selectedProfile}
          />

        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 48,
  },

  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginHorizontal: 8,
    marginTop: 4,
    overflow: 'hidden',
    marginBottom: Platform.OS === 'ios' ? 24 : 16,
  },
});