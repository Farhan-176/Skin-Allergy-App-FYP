import React from 'react';
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
  const guideTopics = [
    {
      id: 1,
      icon: '🔬',
      title: 'How to Take Good Photos',
      description: 'Learn best practices for capturing clear skin images',
    },
    {
      id: 2,
      icon: '📊',
      title: 'Understanding Results',
      description: 'How to interpret AI analysis and confidence scores',
    },
    {
      id: 3,
      icon: '💡',
      title: 'Common Skin Conditions',
      description: 'Learn about eczema, acne, rosacea, and more',
    },
    {
      id: 4,
      icon: '🏥',
      title: 'When to See a Doctor',
      description: 'Know when professional medical attention is needed',
    },
    {
      id: 5,
      icon: '🌿',
      title: 'Skin Care Tips',
      description: 'Daily routines and best practices for healthy skin',
    },
    {
      id: 6,
      icon: '🔒',
      title: 'Privacy & Security',
      description: 'How we protect your personal health information',
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>
          Learn how to get the most out of your skin health app
        </Text>

        {guideTopics.map((topic) => (
          <TouchableOpacity key={topic.id} style={styles.topicCard}>
            <View style={styles.topicIcon}>
              <Text style={styles.topicIconText}>{topic.icon}</Text>
            </View>
            <View style={styles.topicContent}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicDescription}>{topic.description}</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need More Help?</Text>
          <Text style={styles.helpText}>
            Contact our support team for personalized assistance
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
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
  helpSection: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 24,
    marginTop: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
