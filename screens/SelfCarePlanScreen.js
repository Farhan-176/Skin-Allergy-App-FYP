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

export default function SelfCarePlanScreen({ navigation }) {
  const { diagnosisData } = useDiagnosis();

  const carePlan = {
    treatment: [
      'Apply hydrocortisone cream 1% twice daily',
      'Use fragrance-free moisturizer 3-4 times daily',
      'Take antihistamines if itching persists',
      'Avoid hot showers and harsh soaps',
    ],
    doAndDont: {
      dos: [
        'Keep the area clean and dry',
        'Wear loose, breathable clothing',
        'Use cool compresses for relief',
        'Pat skin dry instead of rubbing',
      ],
      donts: [
        'Scratch or pick at the affected area',
        'Use scented products on the skin',
        'Expose to extreme temperatures',
        'Wear tight or synthetic fabrics',
      ],
    },
    timeline: '5-7 days',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Self-Care Plan</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Diagnosis Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Diagnosis</Text>
          <Text style={styles.summaryText}>{diagnosisData.condition}</Text>
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceBadgeText}>
              {(diagnosisData.confidence * 100).toFixed(0)}% Confidence
            </Text>
          </View>
        </View>

        {/* Treatment Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💊 Treatment Plan</Text>
          {carePlan.treatment.map((step, index) => (
            <View key={index} style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Do's */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Do's</Text>
          {carePlan.doAndDont.dos.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Don'ts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>❌ Don'ts</Text>
          {carePlan.doAndDont.donts.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.crossIcon}>✗</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Expected Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineLabel}>Expected Recovery</Text>
          <Text style={styles.timelineText}>{carePlan.timeline}</Text>
          <Text style={styles.timelineNote}>
            If symptoms persist or worsen, consult a dermatologist
          </Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>📤 Share Care Plan</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#212121',
    fontSize: 28,
  },
  headerTitle: {
    color: '#212121',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  summaryCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#1B5E20',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 12,
  },
  confidenceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confidenceBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkIcon: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 12,
    marginTop: 2,
  },
  crossIcon: {
    fontSize: 18,
    color: '#F44336',
    marginRight: 12,
    marginTop: 2,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  timelineCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  timelineLabel: {
    fontSize: 14,
    color: '#1565C0',
    marginBottom: 8,
  },
  timelineText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 12,
  },
  timelineNote: {
    fontSize: 12,
    color: '#1976D2',
    fontStyle: 'italic',
  },
  shareButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  shareButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  doctorButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  doctorButtonText: {
    color: '#424242',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
