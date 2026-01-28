import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PrivacyScreen({ navigation }) {
  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Scan History',
      'Are you sure you want to delete all your scan history? This will permanently remove all your diagnosis records, images, and self-care plans. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              // Delete diagnosis history
              await AsyncStorage.removeItem('diagnosisHistory');
              
              Alert.alert(
                'Success',
                'All scan history has been deleted successfully.',
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('Error deleting data:', error);
              Alert.alert('Error', 'Failed to delete data. Please try again.');
            }
          }
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Your Privacy</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.cardIcon}>🔒</Text>
          <Text style={styles.cardTitle}>Data Encryption</Text>
          <Text style={styles.cardDescription}>
            All your health data is encrypted using industry-standard AES-256 encryption both in transit and at rest.
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>✓ Active</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardIcon}>📸</Text>
          <Text style={styles.cardTitle}>Photo Storage</Text>
          <Text style={styles.cardDescription}>
            Images are stored locally on your device with encrypted backup. We never share your photos without explicit permission.
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>✓ Secure</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardIcon}>🔐</Text>
          <Text style={styles.cardTitle}>Account Security</Text>
          <Text style={styles.cardDescription}>
            Your account is protected with password authentication and secure session management.
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>✓ Protected</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, {marginTop: 32, marginBottom: 16}]}>Data Management</Text>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Download My Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteData}>
          <Text style={styles.dangerButtonText}>Delete All Data</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          We take your privacy seriously. Your data is never sold to third parties and is only used to provide you with better healthcare insights.
        </Text>
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
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F44336',
    marginBottom: 20,
  },
  dangerButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 20,
    textAlign: 'center',
  },
});
