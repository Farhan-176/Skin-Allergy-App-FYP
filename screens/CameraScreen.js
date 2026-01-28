import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useDiagnosis } from '../context/DiagnosisContext';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const { updateDiagnosisData } = useDiagnosis();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (!isCameraReady) {
      Alert.alert('Wait', 'Camera is not ready yet');
      return;
    }

    if (!cameraRef.current) {
      Alert.alert('Error', 'Camera is not available. Please try again.');
      return;
    }
    
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });
      
      // Simulate blurry image detection (random for demo purposes)
      // In production, you would use actual image analysis
      const isBlurry = Math.random() < 0.3; // 30% chance of being blurry for demo
      
      updateDiagnosisData({
        imageUri: photo.uri,
        image: photo,
      });
      
      if (isBlurry) {
        // Navigate to Capture Error screen
        navigation.navigate('CaptureError');
      } else {
        // Navigate to Step 2: Symptom Details
        navigation.navigate('SymptomDetails');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image. Please try again.');
      console.error('Camera error:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        // Simulate blurry image detection (random for demo purposes)
        const isBlurry = Math.random() < 0.3; // 30% chance of being blurry for demo
        
        updateDiagnosisData({
          imageUri: result.assets[0].uri,
          image: result.assets[0],
        });
        
        if (isBlurry) {
          // Navigate to Capture Error screen
          navigation.navigate('CaptureError');
        } else {
          // Navigate to Step 2: Symptom Details
          navigation.navigate('SymptomDetails');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error('Image picker error:', error);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPermissionText}>No access to camera</Text>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={pickImage}
        >
          <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 1 of 3: Capture</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Camera View */}
      <CameraView
        style={styles.camera}
        facing="back"
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      />

      {/* Camera Overlay - Must be outside CameraView */}
      <View style={styles.cameraOverlay}>
        <View style={styles.focusFrame} />
        <Text style={styles.instructionText}>
          Position the affected area within the frame
        </Text>
      </View>

      {/* Bottom Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.galleryIconButton}
          onPress={pickImage}
        >
          <Text style={styles.galleryIcon}>🖼️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePicture}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        <View style={styles.placeholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  focusFrame: {
    width: 280,
    height: 280,
    borderWidth: 3,
    borderColor: '#4CAF50',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 28,
    paddingBottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  galleryIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryIcon: {
    fontSize: 24,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50',
  },
  galleryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
  },
  galleryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  noPermissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
