import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  Svg as RNSvg,
  Circle as RNCircle,
  Path as RNPath,
} from 'react-native-svg';

const Svg = RNSvg as unknown as React.FC<any>;
const Circle = RNCircle as unknown as React.FC<any>;
const Path = RNPath as unknown as React.FC<any>;

export default function HealthScore() {
  return (
    <View style={styles.ringContainer}>
      <View style={styles.ringPlaceholder}>
        <Svg height="200" width="200" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="8"
            fill="none"
          />
          <Path
            d="M 50 10 A 40 40 0 0 1 90 50"
            stroke="#285C4D"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M 90 50 A 40 40 0 0 1 50 90"
            stroke="#F3B5CD"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>

        <View style={styles.ringInnerContent}>
          <Text style={styles.scoreValue}>8.8</Text>
          <View style={styles.scoreLabelRow}>
            <Text style={styles.scoreLabel}>twój wykres zdrowia</Text>
            <Feather
              name="info"
              size={12}
              color="#4A5568"
              style={{ marginLeft: 4 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  ringPlaceholder: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ringInnerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1A202C',
    letterSpacing: -1,
  },
  scoreLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '600',
    textTransform: 'lowercase',
  },
});
