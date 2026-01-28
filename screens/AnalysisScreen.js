import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDiagnosis } from '../context/DiagnosisContext';

export default function AnalysisScreen({ navigation }) {
  const { diagnosisData, updateDiagnosisData, shouldShowDoctorAlert, saveDiagnosisToHistory } = useDiagnosis();
  
  const [loading, setLoading] = useState(true);
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      // Mock AI results
      const mockConfidence = diagnosisData.severity < 4 ? 0.85 : 0.55;
      const mockCondition = diagnosisData.severity < 4 
        ? 'Contact Dermatitis' 
        : 'Severe Skin Condition';
      
      updateDiagnosisData({
        confidence: mockConfidence,
        condition: mockCondition,
        aiResult: {
          diagnosis: mockCondition,
          confidence: mockConfidence,
          recommendations: [
            'Keep the affected area clean and dry',
            'Avoid scratching or irritating the area',
            'Apply gentle moisturizer',
          ],
        },
      });
      
      setLoading(false);
    }, 2000);
  }, []);

  const handleSaveAndFinish = async () => {
    // Save to history
    await saveDiagnosisToHistory();
    
    // Automatically determine navigation based on severity
    if (shouldShowDoctorAlert()) {
      // Severe case - show doctor alert
      navigation.navigate('DoctorAlert');
    } else {
      // Mild case - show self-care plan
      navigation.navigate('SelfCarePlan');
    }
  };

  const handleViewCarePlan = () => {
    navigation.navigate('SelfCarePlan');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Analyzing image...</Text>
        <Text style={styles.loadingSubtext}>AI is processing your skin condition</Text>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>Step 3 of 3: Complete</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image with Heatmap Toggle */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: diagnosisData.imageUri }}
              style={styles.analysisImage}
            />
            {heatmapEnabled && (
              <View style={styles.heatmapOverlay}>
                <View style={styles.heatmapHotspot} />
              </View>
            )}
          </View>
          
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Heatmap Visualization</Text>
            <TouchableOpacity
              style={[styles.toggle, heatmapEnabled && styles.toggleActive]}
              onPress={() => setHeatmapEnabled(!heatmapEnabled)}
            >
              <View style={[styles.toggleThumb, heatmapEnabled && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Analysis Results */}
        <View style={styles.resultsSection}>
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceLabel}>AI Confidence</Text>
            <View style={styles.confidenceBar}>
              <View
                style={[
                  styles.confidenceBarFill,
                  { width: `${diagnosisData.confidence * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.confidenceText}>
              {(diagnosisData.confidence * 100).toFixed(0)}%
            </Text>
          </View>

          <View style={styles.diagnosisCard}>
            <Text style={styles.diagnosisLabel}>Detected Condition</Text>
            <Text style={styles.diagnosisText}>{diagnosisData.condition}</Text>
          </View>

          <View style={styles.insightsCard}>
            <Text style={styles.insightsTitle}>Key Insights</Text>
            {diagnosisData.aiResult?.recommendations.map((rec, index) => (
              <View key={index} style={styles.insightItem}>
                <Text style={styles.insightBullet}>•</Text>
                <Text style={styles.insightText}>{rec}</Text>
              </View>
            ))}
          </View>

          {/* Severity Alert */}
          {shouldShowDoctorAlert() && (
            <View style={styles.alertBox}>
              <Text style={styles.alertIcon}>⚠️</Text>
              <Text style={styles.alertText}>
                Based on the severity, we recommend consulting a dermatologist
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        {!shouldShowDoctorAlert() && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleViewCarePlan}
          >
            <Text style={styles.primaryButtonText}>View Self-Care Plan</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.primaryButton, shouldShowDoctorAlert() && { backgroundColor: '#4CAF50' }]}
          onPress={handleSaveAndFinish}
        >
          <Text style={styles.primaryButtonText}>Save & Finish</Text>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginTop: 20,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
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
    fontSize: 16,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  imageSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  analysisImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  heatmapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  heatmapHotspot: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  resultsSection: {
    padding: 24,
  },
  confidenceContainer: {
    marginBottom: 24,
  },
  confidenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    marginBottom: 8,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  confidenceBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  confidenceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  diagnosisCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  diagnosisLabel: {
    fontSize: 14,
    color: '#1B5E20',
    marginBottom: 8,
  },
  diagnosisText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  insightsCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  insightItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  insightBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  alertBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: '#E65100',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    color: '#424242',
    fontSize: 16,
    fontWeight: '600',
  },
});
