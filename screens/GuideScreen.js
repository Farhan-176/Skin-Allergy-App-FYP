import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

export default function GuideScreen({ navigation }) {
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (id) => {
    setExpandedTopics(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const guideTopics = [
    {
      id: 1,
      icon: '🔬',
      title: 'How to Take Good Photos',
      description: 'Learn best practices for capturing clear skin images',
      content: [
        '• Ensure good lighting - natural daylight is best',
        '• Hold your phone steady to avoid blurry images',
        '• Keep the camera 6-8 inches from your skin',
        '• Make sure the affected area fills most of the frame',
        '• Clean the camera lens before taking photos',
        '• Avoid using flash as it can wash out details',
        '• Take photos from multiple angles if needed',
      ],
    },
    {
      id: 2,
      icon: '📊',
      title: 'Understanding Results',
      description: 'How to interpret AI analysis and confidence scores',
      content: [
        '• Confidence scores show how certain the AI is',
        '• Higher percentages indicate more confident predictions',
        '• Multiple conditions may be detected simultaneously',
        '• Results are preliminary and not a diagnosis',
        '• Always consult a healthcare professional',
        '• Check the severity level for each condition',
        '• Review the recommended actions carefully',
      ],
    },
    {
      id: 3,
      icon: '💡',
      title: 'Common Skin Conditions',
      description: 'Learn about eczema, acne, rosacea, and more',
      content: [
        '• Acne: Common inflammatory condition with pimples and blackheads',
        '• Eczema: Itchy, inflamed skin patches that may be dry or weeping',
        '• Rosacea: Facial redness, visible blood vessels, and bumps',
        '• Psoriasis: Thick, scaly patches of skin',
        '• Dermatitis: General skin inflammation with various causes',
        '• Melanoma: Serious skin cancer that requires immediate attention',
        '• Fungal infections: Circular, scaly patches that may itch',
      ],
    },
    {
      id: 4,
      icon: '🏥',
      title: 'When to See a Doctor',
      description: 'Know when professional medical attention is needed',
      content: [
        '• If symptoms worsen or don\'t improve in 2 weeks',
        '• Severe pain, swelling, or signs of infection',
        '• Moles that change size, shape, or color',
        '• Bleeding or oozing from skin lesions',
        '• Fever accompanying skin symptoms',
        '• Rapid spread of skin condition',
        '• Any suspicious or concerning changes',
        '• When the app recommends professional consultation',
      ],
    },
    {
      id: 5,
      icon: '🌿',
      title: 'Skin Care Tips',
      description: 'Daily routines and best practices for healthy skin',
      content: [
        '• Cleanse your face twice daily with gentle cleanser',
        '• Moisturize regularly to maintain skin barrier',
        '• Use sunscreen daily (SPF 30 or higher)',
        '• Stay hydrated by drinking plenty of water',
        '• Get adequate sleep for skin regeneration',
        '• Avoid touching your face frequently',
        '• Use non-comedogenic products',
        '• Manage stress through relaxation techniques',
      ],
    },
    {
      id: 6,
      icon: '🔒',
      title: 'Privacy & Security',
      description: 'How we protect your personal health information',
      content: [
        '• All photos are encrypted during transmission',
        '• Data is stored securely with industry-standard encryption',
        '• We never share your personal information',
        '• You can delete your data at any time',
        '• HIPAA-compliant security measures',
        '• Regular security audits and updates',
        '• Photos are processed locally when possible',
        '• Anonymous analytics to improve the app',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guide</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcomeText}>
          Learn how to get the most out of your skin health app
        </Text>

        {guideTopics.map((topic) => (
          <View key={topic.id}>
            <TouchableOpacity 
              style={styles.topicCard}
              onPress={() => toggleTopic(topic.id)}
            >
              <View style={styles.topicIcon}>
                <Text style={styles.topicIconText}>{topic.icon}</Text>
              </View>
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
              </View>
              <Text style={[
                styles.arrowIcon,
                expandedTopics[topic.id] && styles.arrowIconExpanded
              ]}>
                {expandedTopics[topic.id] ? '⌄' : '›'}
              </Text>
            </TouchableOpacity>
            
            {expandedTopics[topic.id] && (
              <View style={styles.expandedContent}>
                {topic.content.map((item, index) => (
                  <Text key={index} style={styles.contentItem}>
                    {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
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
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.navCenterIcon}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>📖</Text>
          <Text style={styles.navLabelActive}>Guide</Text>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 24,
    lineHeight: 24,
  },
  topicCard: {
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
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicIconText: {
    fontSize: 24,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#BDBDBD',
    marginLeft: 8,
  },
  arrowIconExpanded: {
    color: '#4CAF50',
  },
  expandedContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: -8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  contentItem: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 24,
    marginBottom: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 35 : 28,
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
  },
});
