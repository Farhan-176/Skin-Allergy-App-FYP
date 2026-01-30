import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

export default function ScanDetailScreen({ navigation, route }) {
  const { scan } = route.params;

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

  const getProgressionLabel = (value) => {
    if (value === 'better') return 'Getting Better';
    if (value === 'worse') return 'Getting Worse';
    return 'Staying the Same';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        <Text style={styles.headerTitle}>Scan Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Scan Image */}
        {scan.imageUri && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: scan.imageUri }}
              style={styles.scanImage}
            />
          </View>
        )}

        {/* Diagnosis Info */}
        <View style={styles.diagnosisCard}>
          <Text style={styles.diagnosisLabel}>Diagnosis</Text>
          <Text style={styles.diagnosisText}>{scan.condition}</Text>
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceBadgeText}>
              {(scan.confidence * 100).toFixed(0)}% Confidence
            </Text>
          </View>
          <Text style={styles.dateText}>{formatDate(scan.date)}</Text>
        </View>

        {/* Symptom Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Responses</Text>

          {/* Severity */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Severity Level</Text>
            <View style={styles.sliderDisplay}>
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: `${(scan.severity / 5) * 100}%` }]} />
                <View style={[styles.sliderThumb, { left: `${((scan.severity - 1) / 4) * 100}%` }]} />
              </View>
              <Text style={styles.sliderValue}>{getSeverityLabel(scan.severity)}</Text>
            </View>
          </View>

          {/* Pain Level */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Pain Level</Text>
            <View style={styles.sliderDisplay}>
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: `${(scan.painLevel / 5) * 100}%`, backgroundColor: '#FF9800' }]} />
                <View style={[styles.sliderThumb, { left: `${((scan.painLevel - 1) / 4) * 100}%`, backgroundColor: '#FF9800' }]} />
              </View>
              <Text style={styles.sliderValue}>{getPainLabel(scan.painLevel)}</Text>
            </View>
          </View>

          {/* Itching Level */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Itching Level</Text>
            {scan.itchingLevel ? (
              <View style={styles.sliderDisplay}>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${(scan.itchingLevel / 5) * 100}%`, backgroundColor: '#9C27B0' }]} />
                  <View style={[styles.sliderThumb, { left: `${((scan.itchingLevel - 1) / 4) * 100}%`, backgroundColor: '#9C27B0' }]} />
                </View>
                <Text style={[styles.sliderValue, { color: '#9C27B0' }]}>{getItchingLabel(scan.itchingLevel)}</Text>
              </View>
            ) : (
              <Text style={styles.notAnswered}>Not answered</Text>
            )}
          </View>

          {/* Duration */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{scan.duration || 'Not specified'}</Text>
          </View>

          {/* Progression */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Condition Progress</Text>
            {scan.progression ? (
              <Text style={styles.detailValue}>{getProgressionLabel(scan.progression)}</Text>
            ) : (
              <Text style={styles.notAnswered}>Not answered</Text>
            )}
          </View>

          {/* Recurrence */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Have you had this before?</Text>
            {scan.isRecurring !== null && scan.isRecurring !== undefined ? (
              <Text style={styles.detailValue}>
                {scan.isRecurring ? 'Yes, recurring condition' : 'No, first time'}
              </Text>
            ) : (
              <Text style={styles.notAnswered}>Not answered</Text>
            )}
          </View>

          {/* Additional Symptoms */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Additional Symptoms</Text>
            {scan.symptoms ? (
              <Text style={styles.detailValueMultiline}>{scan.symptoms}</Text>
            ) : (
              <Text style={styles.notAnswered}>Not specified</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.goBack()}
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
  imageContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  scanImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  diagnosisCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  diagnosisLabel: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 8,
    fontWeight: '600',
  },
  diagnosisText: {
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
    marginBottom: 12,
  },
  confidenceBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 13,
    color: '#616161',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  detailValueMultiline: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
  },
  notAnswered: {
    fontSize: 15,
    color: '#9E9E9E',
    fontStyle: 'italic',
  },
  sliderDisplay: {
    marginTop: 4,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    position: 'relative',
    marginBottom: 8,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    top: -5,
    marginLeft: -8,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
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
