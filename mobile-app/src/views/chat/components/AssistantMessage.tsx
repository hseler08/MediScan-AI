import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AssistantMessageProps {
  content: string;
}

export default function AssistantMessage({
  content,
}: AssistantMessageProps) {
  if (!content) {
    return <Text />;
  }

  const lines = content.split('\n');

  return (
    <View>
      {lines.map((line, lineIndex) => {
        if (line.startsWith('### ')) {
          return (
            <Text
              key={`heading-${lineIndex}`}
              style={styles.heading}
            >
              {line.slice(4)}
            </Text>
          );
        }

        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <Text
            key={`line-${lineIndex}`}
            style={styles.paragraph}
          >
            {parts.map((part, partIndex) => {
              const isBold =
                part.startsWith('**') && part.endsWith('**');

              return (
                <Text
                  key={`part-${partIndex}`}
                  style={isBold ? styles.boldText : undefined}
                >
                  {isBold ? part.slice(2, -2) : part}
                </Text>
              );
            })}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#285C4D',
    marginVertical: 6,
  },

  paragraph: {
    marginBottom: 4,
    color: '#2D3748',
    fontSize: 15,
    lineHeight: 22,
  },

  boldText: {
    fontWeight: '700',
    color: '#1A202C',
  },
});