import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';

export default function NotificationsScreen({ navigation }) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [diagnosisAlerts, setDiagnosisAlerts] = useState(true);
  const [reminderAlerts, setReminderAlerts] = useState(false);

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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Receive instant updates</Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: '#E0E0E0', true: '#81C784' }}
            thumbColor={pushNotifications ? '#4CAF50' : '#F5F5F5'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Email Notifications</Text>
            <Text style={styles.settingDescription}>Get updates via email</Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#E0E0E0', true: '#81C784' }}
            thumbColor={emailNotifications ? '#4CAF50' : '#F5F5F5'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Diagnosis Alerts</Text>
            <Text style={styles.settingDescription}>Alerts about your diagnoses</Text>
          </View>
          <Switch
            value={diagnosisAlerts}
            onValueChange={setDiagnosisAlerts}
            trackColor={{ false: '#E0E0E0', true: '#81C784' }}
            thumbColor={diagnosisAlerts ? '#4CAF50' : '#F5F5F5'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Reminder Alerts</Text>
            <Text style={styles.settingDescription}>Treatment and checkup reminders</Text>
          </View>
          <Switch
            value={reminderAlerts}
            onValueChange={setReminderAlerts}
            trackColor={{ false: '#E0E0E0', true: '#81C784' }}
            thumbColor={reminderAlerts ? '#4CAF50' : '#F5F5F5'}
          />
        </View>

        <Text style={styles.infoText}>
          You can customize your notification preferences at any time. Changes take effect immediately.
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
  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#757575',
  },
  infoText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
});
