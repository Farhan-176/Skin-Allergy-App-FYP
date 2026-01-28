import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';

export default function AIProcessingScreen({ navigation }) {
  const [progress, setProgress] = useState(0);
  const [scanRotation] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Rotating scan animation
    Animated.loop(
      Animated.timing(scanRotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Auto-redirect after progress completes
    const timer = setTimeout(() => {
      navigation.replace('Analysis');
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [navigation]);

  const spin = scanRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Analysis</Text>
      </View>

      {/* Progress Steps */}
      <View style={styles.stepsContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCompleted]}>
            <Text style={styles.stepIcon}>📸</Text>
          </View>
          <Text style={styles.stepLabel}>INPUT</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepActive]}>
            <Text style={styles.stepIcon}>⚡</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>PROCESSING</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepIcon}>📊</Text>
          </View>
          <Text style={styles.stepLabel}>RESULTS</Text>
        </View>
      </View>

      {/* Scanning Circle */}
      <View style={styles.scanContainer}>
        <Animated.View 
          style={[
            styles.scanRing,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <Animated.View 
            style={[
              styles.scanLine,
              { transform: [{ rotate: spin }] }
            ]}
          />
          <View style={styles.scanInner}>
            <View style={styles.scanCore} />
          </View>
        </Animated.View>
      </View>

      {/* Status Text */}
      <View style={styles.statusContainer}>
        <Text style={styles.mainText}>Analyzing skin texture...</Text>
        <Text style={styles.subText}>Detecting patterns and anomalies</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Cross referencing database</Text>
          <Text style={styles.progressPercent}>{progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Security Badge */}
      <View style={styles.securityBadge}>
        <Text style={styles.securityIcon}>🔒</Text>
        <Text style={styles.securityText}>SECURE END-TO-END ENCRYPTION</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2332',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
    marginBottom: 60,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepActive: {
    backgroundColor: '#2196F3',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  stepCompleted: {
    backgroundColor: '#34495E',
  },
  stepIcon: {
    fontSize: 20,
  },
  stepLabel: {
    fontSize: 11,
    color: '#7F8C8D',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  stepLabelActive: {
    color: '#2196F3',
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: '#34495E',
    marginBottom: 30,
  },
  scanContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  scanRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#2196F3',
    top: '50%',
  },
  scanInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },
  scanCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
  mainText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subText: {
    fontSize: 14,
    color: '#95A5A6',
  },
  progressContainer: {
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#95A5A6',
  },
  progressPercent: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2C3E50',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(44, 62, 80, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  securityIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  securityText: {
    fontSize: 10,
    color: '#95A5A6',
    fontWeight: '600',
    letterSpacing: 1,
  },
});
