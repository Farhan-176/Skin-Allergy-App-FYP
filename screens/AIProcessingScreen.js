import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

export default function AIProcessingScreen({ navigation }) {
  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Analysis');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        {/* Large Blue Circular Progress Indicator */}
        <ActivityIndicator 
          size="large" 
          color="#2196F3" 
          style={styles.spinner}
        />
        
        <Text style={styles.mainText}>
          Analyzing skin texture and extracting features...
        </Text>
        
        <Text style={styles.subText}>
          This may take a few moments
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  spinner: {
    transform: [{ scale: 1.5 }],
    marginBottom: 40,
  },
  mainText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 26,
  },
  subText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
});
