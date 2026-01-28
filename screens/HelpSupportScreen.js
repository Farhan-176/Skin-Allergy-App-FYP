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

export default function HelpSupportScreen({ navigation }) {
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@skindiagnosis.com');
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>How can we help you?</Text>
        
        <TouchableOpacity style={styles.helpCard}>
          <View style={styles.helpIconContainer}>
            <Text style={styles.helpIcon}>❓</Text>
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>FAQs</Text>
            <Text style={styles.helpDescription}>Find answers to common questions</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpCard} onPress={handleEmailSupport}>
          <View style={styles.helpIconContainer}>
            <Text style={styles.helpIcon}>📧</Text>
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Contact Support</Text>
            <Text style={styles.helpDescription}>support@skindiagnosis.com</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpCard}>
          <View style={styles.helpIconContainer}>
            <Text style={styles.helpIcon}>📱</Text>
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>User Guide</Text>
            <Text style={styles.helpDescription}>Learn how to use the app</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpCard}>
          <View style={styles.helpIconContainer}>
            <Text style={styles.helpIcon}>🐛</Text>
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Report a Problem</Text>
            <Text style={styles.helpDescription}>Let us know about any issues</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, {marginTop: 32, marginBottom: 16}]}>Common Questions</Text>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How accurate is the AI diagnosis?</Text>
          <Text style={styles.faqAnswer}>
            Our AI has been trained on thousands of dermatological images and provides preliminary assessments. However, it should not replace professional medical advice.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Is my data secure?</Text>
          <Text style={styles.faqAnswer}>
            Yes, all your data is encrypted and stored securely. We never share your information with third parties without your consent.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Can I delete my account?</Text>
          <Text style={styles.faqAnswer}>
            You can delete your account and all associated data from the Privacy & Security settings.
          </Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactDescription}>
            Our support team is available Monday to Friday, 9 AM - 6 PM
          </Text>
          <TouchableOpacity style={styles.contactButton} onPress={handleEmailSupport}>
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
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
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
  },
  helpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  helpIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  helpIcon: {
    fontSize: 24,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 13,
    color: '#757575',
  },
  arrow: {
    fontSize: 24,
    color: '#BDBDBD',
    marginLeft: 8,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 32,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
