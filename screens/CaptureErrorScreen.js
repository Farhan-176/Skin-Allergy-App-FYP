import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Camera } from 'expo-camera';

export default function CaptureErrorScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera Background (blurred/static) */}
      <Camera
        style={styles.cameraBackground}
        type={Camera.Constants.Type.back}
      />

      {/* Dark Overlay */}
      <View style={styles.overlay}>
        {/* Error Dialog */}
        <View style={styles.errorDialog}>
          <View style={styles.errorIconContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
          </View>
          
          <Text style={styles.errorTitle}>Scan Failed</Text>
          <Text style={styles.errorMessage}>
            Image too blurry. Please ensure good lighting and hold the camera steady.
          </Text>

          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retakeButtonText}>Retake Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorDialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorIcon: {
    fontSize: 48,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 15,
    color: '#616161',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  retakeButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: '100%',
  },
  retakeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
