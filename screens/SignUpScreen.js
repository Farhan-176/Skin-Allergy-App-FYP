import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = async () => {
    // Validate inputs
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      // Get existing users from AsyncStorage
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if email already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        Alert.alert('Error', 'An account with this email already exists. Please sign in.');
        return;
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        fullName,
        email,
        password,
        phone,
        createdAt: new Date().toISOString(),
      };

      // Add new user to users array
      users.push(newUser);

      // Save updated users array
      await AsyncStorage.setItem('users', JSON.stringify(users));

      // Store current user session
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));

      // Navigate to EditProfile to complete profile information
      Alert.alert('Success', 'Account created successfully! Please complete your profile.', [
        { 
          text: 'OK', 
          onPress: () => navigation.replace('EditProfile', { 
            userName: newUser.fullName, 
            userEmail: newUser.email,
            isNewUser: true 
          }) 
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Sign up error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#9E9E9E"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9E9E9E"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor="#9E9E9E"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password *</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#9E9E9E"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password *</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#9E9E9E"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <Text style={styles.signUpButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  form: {
    flex: 1,
    marginBottom: 20,
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
  signUpButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 12,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#757575',
    fontSize: 14,
  },
  signInText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
});
