import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useDiagnosis } from '../context/DiagnosisContext';

export default function SymptomDetailsScreen({ navigation }) {
  const { diagnosisData, updateDiagnosisData } = useDiagnosis();
  
  const [severity, setSeverity] = useState(1);
  const [painLevel, setPainLevel] = useState(1);
  const [itchingLevel, setItchingLevel] = useState(1);
  const [duration, setDuration] = useState('');
  const [progression, setProgression] = useState('stable');
  const [isRecurring, setIsRecurring] = useState(null);
  const [symptoms, setSymptoms] = useState('');

  const handleContinue = () => {
    updateDiagnosisData({
      severity,
      painLevel,
      itchingLevel,
      duration,
      progression,
      isRecurring,
      symptoms,
    });
    
    // Navigate to AIProcessing screen
    navigation.navigate('AIProcessing');
  };

  const getSeverityLabel = (value) => {
    if (value <= 2) return 'Mild';
    if (value <= 4) return 'Moderate';
    return 'Severe';
  };

  const getPainLabel = (value) => {
    if (value <= 2) return 'Minimal';
    if (value <= 4) return 'Moderate';
    return 'Intense';
  };

  const getItchingLabel = (value) => {
    if (value <= 2) return 'Minimal';
    if (value <= 4) return 'Moderate';
    return 'Severe';
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
        <Text style={styles.headerTitle}>Step 2 of 3: Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Preview Image */}
        {diagnosisData.imageUri && (
          <View style={styles.imagePreview}>
            <Image
              source={{ uri: diagnosisData.imageUri }}
              style={styles.previewImage}
            />
          </View>
        )}

        {/* Severity Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Severity Level</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{getSeverityLabel(severity)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={severity}
              onValueChange={setSeverity}
              minimumTrackTintColor="#4CAF50"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#4CAF50"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Mild</Text>
              <Text style={styles.sliderLabelText}>Severe</Text>
            </View>
          </View>
        </View>

        {/* Pain Level Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pain Level</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{getPainLabel(painLevel)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={painLevel}
              onValueChange={setPainLevel}
              minimumTrackTintColor="#FF9800"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#FF9800"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>No Pain</Text>
              <Text style={styles.sliderLabelText}>Intense</Text>
            </View>
          </View>
        </View>

        {/* Itching Level Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itching Level</Text>
          <View style={styles.sliderContainer}>
            <Text style={[styles.sliderLabel, { color: '#9C27B0' }]}>{getItchingLabel(itchingLevel)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={itchingLevel}
              onValueChange={setItchingLevel}
              minimumTrackTintColor="#9C27B0"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#9C27B0"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>No Itch</Text>
              <Text style={styles.sliderLabelText}>Severe</Text>
            </View>
          </View>
        </View>

        {/* Duration Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 3 days, 2 weeks"
            placeholderTextColor="#9E9E9E"
            value={duration}
            onChangeText={setDuration}
          />
        </View>

        {/* Progression */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Is it getting better or worse?</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.optionButton, progression === 'better' && styles.optionButtonActive]}
              onPress={() => setProgression('better')}
            >
              <Text style={[styles.optionButtonText, progression === 'better' && styles.optionButtonTextActive]}>↑ Better</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, progression === 'stable' && styles.optionButtonActive]}
              onPress={() => setProgression('stable')}
            >
              <Text style={[styles.optionButtonText, progression === 'stable' && styles.optionButtonTextActive]}>→ Same</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, progression === 'worse' && styles.optionButtonActive]}
              onPress={() => setProgression('worse')}
            >
              <Text style={[styles.optionButtonText, progression === 'worse' && styles.optionButtonTextActive]}>↓ Worse</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recurrence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have you had this before?</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.optionButton, styles.wideButton, isRecurring === true && styles.optionButtonActive]}
              onPress={() => setIsRecurring(true)}
            >
              <Text style={[styles.optionButtonText, isRecurring === true && styles.optionButtonTextActive]}>Yes, recurring</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.wideButton, isRecurring === false && styles.optionButtonActive]}
              onPress={() => setIsRecurring(false)}
            >
              <Text style={[styles.optionButtonText, isRecurring === false && styles.optionButtonTextActive]}>No, first time</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Symptoms Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Symptoms</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe any itching, burning, or other symptoms..."
            placeholderTextColor="#9E9E9E"
            value={symptoms}
            onChangeText={setSymptoms}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue to Analysis</Text>
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
    fontSize: 16,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  imagePreview: {
    alignItems: 'center',
    marginVertical: 20,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  sliderContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
  },
  sliderLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabelText: {
    fontSize: 12,
    color: '#757575',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#212121',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  optionButtonActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#757575',
  },
  optionButtonTextActive: {
    color: '#4CAF50',
  },
  wideButton: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
