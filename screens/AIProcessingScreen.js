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
      <StatusBar barStyle="dark-content" />
      
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    letterSpacing: 0.5,
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
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  stepActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  stepCompleted: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  stepIcon: {
    fontSize: 22,
  },
  stepLabel: {
    fontSize: 11,
    color: '#9E9E9E',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  stepLabelActive: {
    color: '#4CAF50',
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: '#E0E0E0',
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
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: '#4CAF50',
    top: '50%',
  },
  scanInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#66BB6A',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
  },
  scanCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
    paddingHorizontal: 40,
  },
  mainText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subText: {
    fontSize: 14,
    color: '#757575',
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
    fontSize: 13,
    color: '#757575',
  },
  progressPercent: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  securityIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  securityText: {
    fontSize: 10,
    color: '#616161',
    fontWeight: '600',
    letterSpacing: 1,
  },
});
