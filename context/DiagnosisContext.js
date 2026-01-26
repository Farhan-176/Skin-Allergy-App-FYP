import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DiagnosisContext = createContext();

export const useDiagnosis = () => {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error('useDiagnosis must be used within DiagnosisProvider');
  }
  return context;
};

export const DiagnosisProvider = ({ children }) => {
  const [diagnosisData, setDiagnosisData] = useState({
    image: null,
    imageUri: null,
    severity: 1,
    painLevel: 1,
    duration: '',
    symptoms: '',
    aiResult: null,
    confidence: 0,
    condition: '',
    heatmapEnabled: false,
  });

  const updateDiagnosisData = (data) => {
    setDiagnosisData(prev => ({ ...prev, ...data }));
  };

  const resetDiagnosisData = () => {
    setDiagnosisData({
      image: null,
      imageUri: null,
      severity: 1,
      painLevel: 1,
      duration: '',
      symptoms: '',
      aiResult: null,
      confidence: 0,
      condition: '',
      heatmapEnabled: false,
    });
  };

  const shouldShowDoctorAlert = () => {
    // Logic to determine if doctor alert should be shown
    return diagnosisData.severity >= 4 || diagnosisData.confidence < 0.6;
  };

  const saveDiagnosisToHistory = async () => {
    try {
      const historyItem = {
        id: Date.now().toString(),
        condition: diagnosisData.condition,
        date: new Date().toISOString(),
        severity: diagnosisData.severity,
        painLevel: diagnosisData.painLevel,
        duration: diagnosisData.duration,
        symptoms: diagnosisData.symptoms,
        confidence: diagnosisData.confidence,
        imageUri: diagnosisData.imageUri,
      };

      // Get existing history
      const historyData = await AsyncStorage.getItem('diagnosisHistory');
      const history = historyData ? JSON.parse(historyData) : [];

      // Add new item to the beginning
      history.unshift(historyItem);

      // Save updated history
      await AsyncStorage.setItem('diagnosisHistory', JSON.stringify(history));
      
      return true;
    } catch (error) {
      console.error('Error saving diagnosis to history:', error);
      return false;
    }
  };

  return (
    <DiagnosisContext.Provider
      value={{
        diagnosisData,
        updateDiagnosisData,
        resetDiagnosisData,
        shouldShowDoctorAlert,
        saveDiagnosisToHistory,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};
