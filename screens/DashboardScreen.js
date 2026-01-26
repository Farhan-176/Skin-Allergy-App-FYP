import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useDiagnosis } from '../context/DiagnosisContext';

export default function DashboardScreen({ navigation }) {
  const { resetDiagnosisData } = useDiagnosis();

  const handleStartScan = () => {
    resetDiagnosisData();
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, User 👋</Text>
          <Text style={styles.subtitle}>How can we help you today?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Start Scan Card */}
        <View style={styles.scanCard}>
          <Text style={styles.scanCardTitle}>Start New Diagnosis</Text>
          <Text style={styles.scanCardSubtitle}>
            Take a photo and get AI-powered insights
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleStartScan}
          >
            <View style={styles.scanButtonIcon}>
              <Text style={styles.scanButtonIconText}>+</Text>
            </View>
            <Text style={styles.scanButtonText}>Start Scan</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>📚</Text>
              <Text style={styles.quickActionText}>Learn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>🏥</Text>
              <Text style={styles.quickActionText}>Find Doctor</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#4CAF50',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#E8F5E9',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#66BB6A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  scanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    marginTop: 0,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E8F5E9',
  },
  scanCardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2E7D32',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  scanCardSubtitle: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 24,
    lineHeight: 24,
    fontWeight: '500',
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scanButtonIconText: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  historySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  historyCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyIconText: {
    fontSize: 24,
  },
  historyCondition: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  severityLow: {
    backgroundColor: '#E8F5E9',
  },
  severityMedium: {
    backgroundColor: '#FFF3E0',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#424242',
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
  },
});
