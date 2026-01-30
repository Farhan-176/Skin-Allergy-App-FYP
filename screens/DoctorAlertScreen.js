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

export default function DoctorAlertScreen({ navigation }) {
  const { diagnosisData } = useDiagnosis();

  const handleViewCarePlan = () => {
    navigation.navigate('SelfCarePlan');
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
        <Text style={styles.headerTitle}>Medical Consultation</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Alert Banner */}
        <View style={styles.alertBanner}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Dermatologist Recommended</Text>
            <Text style={styles.alertText}>
              Based on the severity and our AI analysis, we recommend consulting 
              with a medical professional for proper diagnosis and treatment.
            </Text>
          </View>
        </View>

        {/* Diagnosis Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Detected Condition</Text>
          <Text style={styles.summaryCondition}>{diagnosisData.condition}</Text>
          <View style={styles.summaryDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Severity</Text>
              <Text style={styles.detailValue}>
                {diagnosisData.severity >= 4 ? 'High' : 'Medium'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>AI Confidence</Text>
              <Text style={styles.detailValue}>
                {(diagnosisData.confidence * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Why See a Doctor */}
        <View style={styles.reasonsCard}>
          <Text style={styles.reasonsTitle}>Why See a Doctor?</Text>
          <View style={styles.reasonItem}>
            <Text style={styles.reasonIcon}>🔬</Text>
            <Text style={styles.reasonText}>Professional diagnosis and lab tests</Text>
          </View>
          <View style={styles.reasonItem}>
            <Text style={styles.reasonIcon}>💊</Text>
            <Text style={styles.reasonText}>Prescription medications if needed</Text>
          </View>
          <View style={styles.reasonItem}>
            <Text style={styles.reasonIcon}>📋</Text>
            <Text style={styles.reasonText}>Personalized treatment plan</Text>
          </View>
          <View style={styles.reasonItem}>
            <Text style={styles.reasonIcon}>🔄</Text>
            <Text style={styles.reasonText}>Follow-up care and monitoring</Text>
          </View>
        </View>

        {/* Emergency Note */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyIcon}>🚨</Text>
          <Text style={styles.emergencyText}>
            If you experience severe pain, swelling, or signs of infection, 
            seek immediate medical attention.
          </Text>
        </View>

        {/* Alternative Option */}
        <TouchableOpacity
          style={styles.alternativeButton}
          onPress={handleViewCarePlan}
        >
          <Text style={styles.alternativeButtonText}>
            View Self-Care Recommendations (Not Advised)
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.doneButtonText}>I Understand</Text>
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
  alertBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  alertIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#E65100',
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#C62828',
    marginBottom: 8,
  },
  summaryCondition: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 16,
  },
  summaryDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#D32F2F',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#C62828',
  },
  reasonsCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  reasonsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reasonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  reasonText: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
  },
  emergencyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  emergencyIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  emergencyText: {
    flex: 1,
    fontSize: 12,
    color: '#C62828',
    lineHeight: 18,
  },
  alternativeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  alternativeButtonText: {
    color: '#757575',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 32,
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
