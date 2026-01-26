# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the App
```bash
npm start
```

### Step 3: Choose Your Platform
- Press **`a`** for Android emulator
- Press **`i`** for iOS simulator
- Press **`w`** for web browser
- Scan QR code with **Expo Go** app on your phone

## 📱 Testing the App Flow

1. **Landing Screen** → Click "Get Started"
2. **Sign In** → Enter any credentials (mock auth)
3. **Dashboard** → Click the green "Start Scan" button
4. **Camera** → Take a photo or choose from gallery
5. **Symptom Details** → Adjust sliders and add information
6. **Analysis** → Toggle heatmap, view AI results
7. **Outcome** → 
   - Low severity → Self-Care Plan
   - High severity → Doctor Alert

## 🎯 Testing Conditional Routing

### To see Self-Care Plan:
- Set **Severity slider** to 1-3 (Mild/Moderate)

### To see Doctor Alert:
- Set **Severity slider** to 4-5 (Severe)

## 🔧 Troubleshooting

### Camera not working?
- Grant camera permissions when prompted
- Use "Choose from Gallery" as alternative

### Metro bundler issues?
```bash
npm start --clear
```

### Dependencies not installing?
```bash
rm -rf node_modules
npm install
```

## 📂 Project Overview

**8 Screens Total:**
1. LandingScreen (screen4)
2. SignInScreen (screen6)
3. DashboardScreen (screen)
4. CameraScreen (screen2 - modified)
5. SymptomDetailsScreen (screen7)
6. AnalysisScreen (screen8)
7. SelfCarePlanScreen (screen1)
8. DoctorAlertScreen (screen5)

**Smart Conditional Logic:**
- Automatically routes to appropriate outcome based on severity and AI confidence
- Implemented in `context/DiagnosisContext.js`

## 💡 FYP Demonstration Tips

**Highlight these features:**
1. **Heatmap Toggle** - Shows AI visualization (technical feature)
2. **3-Step Wizard** - Structured diagnosis flow
3. **Conditional Routing** - Smart decision making
4. **State Management** - Context API implementation
5. **Clean UI** - Follows design specifications

---

**Need Help?** Check [README.md](README.md) for full documentation.
