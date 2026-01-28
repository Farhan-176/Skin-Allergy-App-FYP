import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';

export default function AboutScreen({ navigation }) {
  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>SD</Text>
          </View>
          <Text style={styles.appName}>Skin Diagnosis</Text>
          <Text style={styles.tagline}>AI-Powered Dermatology Assistant</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Release Date</Text>
            <Text style={styles.infoValue}>January 2026</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Developer</Text>
            <Text style={styles.infoValue}>Skin Diagnosis Team</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About This App</Text>
        <Text style={styles.description}>
          Skin Diagnosis is an AI-powered mobile application designed to help you monitor and understand your skin health. Using advanced machine learning algorithms, we provide preliminary assessments of common skin conditions.
        </Text>
        <Text style={styles.description}>
          This app is intended for educational purposes and should not replace professional medical advice. Always consult with a qualified dermatologist for accurate diagnosis and treatment.
        </Text>

        <Text style={styles.sectionTitle}>Legal</Text>

        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => handleOpenLink('https://skindiagnosis.com/terms')}
        >
          <Text style={styles.linkText}>Terms of Service</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => handleOpenLink('https://skindiagnosis.com/privacy')}
        >
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => handleOpenLink('https://skindiagnosis.com/licenses')}
        >
          <Text style={styles.linkText}>Open Source Licenses</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Skin Diagnosis. All rights reserved.
          </Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ for better skin health
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#212121',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#757575',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 22,
    marginBottom: 16,
  },
  linkItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  linkText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 24,
    color: '#BDBDBD',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9E9E9E',
  },
});
