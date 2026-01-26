import React, { createContext, useContext, useState } from 'react';

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

  return (
    <DiagnosisContext.Provider
      value={{
        diagnosisData,
        updateDiagnosisData,
        resetDiagnosisData,
        shouldShowDoctorAlert,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};
