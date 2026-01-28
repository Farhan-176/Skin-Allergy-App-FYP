import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen({ navigation, route }) {
  const { userName: currentName, userEmail: currentEmail, isNewUser } = route.params || {};
  const [name, setName] = useState(currentName || '');
  const [email, setEmail] = useState(currentEmail || '');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (currentUserData) {
        const user = JSON.parse(currentUserData);
        setPhone(user.phone || '');
        setDateOfBirth(user.dateOfBirth || '');
        setGender(user.gender || '');
        setBloodType(user.bloodType || '');
        setAllergies(user.allergies || '');
        setMedications(user.medications || '');
        setEmergencyContact(user.emergencyContact || '');
        setEmergencyPhone(user.emergencyPhone || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Your profile is incomplete. Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('currentUser');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Landing' }],
              });
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ]
    );
  };

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Please fill in name and email');
      return;
    }

    // For new users, require phone number to complete profile
    if (isNewUser && (!phone || phone.trim() === '')) {
      Alert.alert('Error', 'Please enter your phone number to complete your profile');
      return;
    }

    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (currentUserData) {
        const user = JSON.parse(currentUserData);
        user.fullName = name;
        user.email = email;
        user.phone = phone;
        user.dateOfBirth = dateOfBirth;
        user.gender = gender;
        user.bloodType = bloodType;
        user.allergies = allergies;
        user.medications = medications;
        user.emergencyContact = emergencyContact;
        user.emergencyPhone = emergencyPhone;
        
        // Update current user session
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        
        // Also update the user in the users array
        const usersData = await AsyncStorage.getItem('users');
        if (usersData) {
          const users = JSON.parse(usersData);
          const userIndex = users.findIndex(u => u.email === user.email);
          if (userIndex !== -1) {
            users[userIndex] = user;
            await AsyncStorage.setItem('users', JSON.stringify(users));
          }
        }
        
        if (isNewUser) {
          // For new users, navigate to Dashboard after completing profile
          Alert.alert('Success', 'Profile completed successfully!', [
            { text: 'OK', onPress: () => navigation.replace('Dashboard') }
          ]);
        } else {
          // For existing users, just go back to profile screen
          Alert.alert('Success', 'Profile updated successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]);
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        {isNewUser ? (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{isNewUser ? 'Complete Profile' : 'Edit Profile'}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Male / Female / Other"
              value={gender}
              onChangeText={setGender}
            />
          </View>

          <Text style={styles.sectionTitle}>Medical Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Blood Type</Text>
            <TextInput
              style={styles.input}
              placeholder="A+ / B+ / O+ / AB+ etc."
              value={bloodType}
              onChangeText={setBloodType}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Known Allergies</Text>
            <TextInput
              style={styles.input}
              placeholder="List any allergies"
              value={allergies}
              onChangeText={setAllergies}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Medications</Text>
            <TextInput
              style={styles.input}
              placeholder="List any medications you're taking"
              value={medications}
              onChangeText={setMedications}
              multiline
              numberOfLines={3}
            />
          </View>

          <Text style={styles.sectionTitle}>Emergency Contact</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Emergency contact name"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Emergency contact phone"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>{isNewUser ? 'Complete Profile' : 'Save Changes'}</Text>
          </TouchableOpacity>

          {!isNewUser && (
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}

          {isNewUser && (
            <Text style={styles.newUserNote}>
              Please complete your profile to continue
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  },
  backButtonText: {
    fontSize: 28,
    color: '#212121',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '600',
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
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 32,
  },
  form: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 8,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
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
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '600',
  },
  newUserNote: {
    textAlign: 'center',
    fontSize: 14,
    color: '#757575',
    marginTop: 20,
    marginBottom: 40,
  },
});
