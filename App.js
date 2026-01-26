import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DiagnosisProvider } from './context/DiagnosisContext';

// Import screens
import LandingScreen from './screens/LandingScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';
import CameraScreen from './screens/CameraScreen';
import CaptureErrorScreen from './screens/CaptureErrorScreen';
import SymptomDetailsScreen from './screens/SymptomDetailsScreen';
import AIProcessingScreen from './screens/AIProcessingScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import SelfCarePlanScreen from './screens/SelfCarePlanScreen';
import DoctorAlertScreen from './screens/DoctorAlertScreen';
import HistoryScreen from './screens/HistoryScreen';
import GuideScreen from './screens/GuideScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DiagnosisProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="CaptureError" component={CaptureErrorScreen} />
          <Stack.Screen name="SymptomDetails" component={SymptomDetailsScreen} />
          <Stack.Screen name="AIProcessing" component={AIProcessingScreen} />
          <Stack.Screen name="Analysis" component={AnalysisScreen} />
          <Stack.Screen name="SelfCarePlan" component={SelfCarePlanScreen} />
          <Stack.Screen name="DoctorAlert" component={DoctorAlertScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Guide" component={GuideScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DiagnosisProvider>
  );
}
