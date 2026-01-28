import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Logo/Icon Area */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Skin Diagnosis</Text>
        <Text style={styles.subtitle}>AI-Powered Dermatology Assistant</Text>
      </View>

      {/* Feature Highlights */}
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>📸</Text>
          <Text style={styles.featureText}>Capture & Analyze</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🧠</Text>
          <Text style={styles.featureText}>AI Diagnosis</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>💊</Text>
          <Text style={styles.featureText}>Care Plans</Text>
        </View>
      </View>

      {/* Call-to-Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        Not a substitute for professional medical advice
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 80,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#424242',
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: '600',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#9E9E9E',
    fontSize: 12,
    marginTop: 24,
  },
});
