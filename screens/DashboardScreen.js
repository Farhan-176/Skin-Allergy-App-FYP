import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDiagnosis } from '../context/DiagnosisContext';

const SKIN_TIPS = [
  {
    id: 1,
    icon: '💧',
    title: 'Stay Hydrated',
    description: 'Maintain your skin\'s natural barrier by drinking at least 8 glasses of water. Avoid fragrance-heavy soaps during active flare-ups.',
  },
  {
    id: 2,
    icon: '☀️',
    title: 'Sun Protection',
    description: 'Apply broad-spectrum SPF 30+ sunscreen daily, even on cloudy days. UV exposure can worsen many skin conditions and accelerate aging.',
  },
  {
    id: 3,
    icon: '🥗',
    title: 'Eat Antioxidants',
    description: 'Include foods rich in vitamins C and E like berries, nuts, and leafy greens. These help protect your skin from damage and promote healing.',
  },
  {
    id: 4,
    icon: '😴',
    title: 'Quality Sleep',
    description: 'Get 7-9 hours of sleep nightly. Your skin repairs itself during sleep, making rest essential for a healthy complexion.',
  },
  {
    id: 5,
    icon: '🧴',
    title: 'Moisturize Daily',
    description: 'Apply moisturizer within 3 minutes after bathing to lock in moisture. Choose fragrance-free products for sensitive skin.',
  },
  {
    id: 6,
    icon: '🚿',
    title: 'Gentle Cleansing',
    description: 'Use lukewarm water and mild cleansers. Hot water and harsh soaps strip natural oils, leading to dryness and irritation.',
  },
  {
    id: 7,
    icon: '🧘',
    title: 'Manage Stress',
    description: 'Practice stress-reduction techniques like meditation or yoga. Stress hormones can trigger inflammation and skin flare-ups.',
  },
  {
    id: 8,
    icon: '🚭',
    title: 'Avoid Smoking',
    description: 'Smoking reduces blood flow to the skin, depletes oxygen and nutrients, and breaks down collagen and elastin.',
  },
];

export default function DashboardScreen({ navigation }) {
  const { resetDiagnosisData } = useDiagnosis();
  const [dailyTip, setDailyTip] = useState(SKIN_TIPS[0]);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // Select a tip based on the day of the year for consistency
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const tipIndex = dayOfYear % SKIN_TIPS.length;
    setDailyTip(SKIN_TIPS[tipIndex]);

    // Load user name from AsyncStorage
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (currentUserData) {
        const user = JSON.parse(currentUserData);
        // Extract first name from full name
        const firstName = user.fullName ? user.fullName.split(' ')[0] : 'User';
        setUserName(firstName);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

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
          <Text style={styles.greeting}>Hello, {userName} 👋</Text>
          <Text style={styles.subtitle}>How can we help you today?</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
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

        {/* Skin Tip of the Day */}
        <View style={styles.tipSection}>
          <Text style={styles.sectionTitle}>Skin Tip of the Day</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Text style={styles.tipIcon}>{dailyTip.icon}</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{dailyTip.title}</Text>
              <Text style={styles.tipDescription}>
                {dailyTip.description}
              </Text>
            </View>
          </View>
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.navIcon}>🕒</Text>
          <Text style={styles.navLabel}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navCenterButton}
          onPress={handleStartScan}
        >
          <Text style={styles.navCenterIcon}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Guide')}
        >
          <Text style={styles.navIcon}>📖</Text>
          <Text style={styles.navLabel}>Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  tipSection: {
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 35 : 37,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 22,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  navLabelActive: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  navCenterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    elevation: 8,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  navCenterIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },});