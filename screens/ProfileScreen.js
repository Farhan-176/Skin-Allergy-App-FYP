import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (currentUserData) {
        const user = JSON.parse(currentUserData);
        setUserName(user.fullName || 'User');
        setUserEmail(user.email || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('currentUser');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Landing' }],
              });
            } catch (error) {
              console.error('Error signing out:', error);
            }
          },
        },
      ]
    );
  };

  const handleMenuItemClick = (route, params = {}) => {
    navigation.navigate(route, params);
  };

  const menuItems = [
    { 
      id: 'profile', 
      icon: '👤', 
      title: 'Edit Profile', 
      subtitle: 'Update your personal information',
      route: 'EditProfile',
    },
    { 
      id: 'notifications', 
      icon: '🔔', 
      title: 'Notifications', 
      subtitle: 'Manage notification preferences',
      route: 'Notifications',
    },
    { 
      id: 'privacy', 
      icon: '🔒', 
      title: 'Privacy', 
      subtitle: 'Privacy and security settings',
      route: 'Privacy',
    },
    { 
      id: 'help', 
      icon: '❓', 
      title: 'Help & Support', 
      subtitle: 'Get help and contact support',
      route: 'HelpSupport',
    },
    { 
      id: 'about', 
      icon: 'ℹ️', 
      title: 'About', 
      subtitle: 'App version and information',
      route: 'About',
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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{userEmail}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.route) {
                  const params = item.id === 'profile' ? { userName, userEmail } : {};
                  handleMenuItemClick(item.route, params);
                } else if (item.action) {
                  item.action();
                }
              }}
            >
              <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Guide')}
        >
          <Text style={styles.navIcon}>📖</Text>
          <Text style={styles.navLabel}>Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>👤</Text>
          <Text style={styles.navLabelActive}>Profile</Text>
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
    paddingBottom: 120,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#757575',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#757575',
  },
  menuArrow: {
    fontSize: 24,
    color: '#BDBDBD',
    marginLeft: 8,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 24,
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
