<div align="center">

<img src="assets/logo.png" alt="Skin Diagnosis App Logo" width="200"/>

# 🔬 Skin Diagnosis App

### AI-Powered Dermatology Assistant

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![FYP](https://img.shields.io/badge/Final%20Year-Project-purple?style=for-the-badge)](https://github.com)

*An intelligent mobile application that revolutionizes skin condition diagnosis through AI-powered analysis and personalized care recommendations.*

[Features](#-key-features) • [Installation](#-installation--setup) • [Architecture](#-app-flow-architecture) • [Tech Stack](#-dependencies)

</div>

---

## 📋 Overview

An **AI-powered mobile application** for skin condition diagnosis built with **React Native** and **Expo**. This comprehensive healthcare solution implements a complete user flow from authentication to AI-based diagnosis with intelligent conditional routing based on severity assessment.

---

## 🗺️ App Flow Architecture

### 📱 User Journey

```mermaid
graph TD
    A[🏠 Landing Screen] --> B[🔐 Sign In]
    B --> C[📊 Dashboard]
    C --> D[📸 Step 1: Camera Capture]
    D --> E[📝 Step 2: Symptom Details]
    E --> F[🤖 Step 3: AI Analysis]
    F --> G{Severity Check}
    G -->|Mild| H[💚 Self-Care Plan]
    G -->|Severe| I[🏥 Doctor Alert]
    
    style A fill:#e1f5ff
    style B fill:#fff9e1
    style C fill:#f0e1ff
    style D fill:#ffe1e1
    style E fill:#e1ffe1
    style F fill:#ffe1f5
    style G fill:#ffd700
    style H fill:#90EE90
    style I fill:#FFB6C1
```

---

## ✨ Key Features

### 1. 🚪 **Onboarding & Authentication**
- ✅ **Landing Screen**: Welcome page showcasing app features
- ✅ **Sign In Screen**: Secure user authentication system

### 2. 📊 **Dashboard**
- 📜 Comprehensive scan history display
- ⚡ Quick action buttons for easy access
- 🎯 Start new diagnosis flow instantly

### 3. 🔬 **Diagnosis Wizard (3-Step Process)**

#### 📸 Step 1: Camera Capture
- 📷 Real-time camera view with precision focus frame
- 🖼️ Gallery image picker as convenient alternative
- 🎨 Clean, intuitive UI design

#### 📝 Step 2: Symptom Details
- 📊 Severity level slider (1-5 scale)
- 💢 Pain level slider (1-5 scale)
- ⏱️ Duration text input
- 📋 Additional symptoms description field

#### 🤖 Step 3: AI Analysis & Results
- ⌛ Loading state with AI processing animation
- 🔥 **Heatmap Visualization Toggle** (Advanced FYP feature)
- 📈 AI confidence meter (0-100%)
- 🎯 Detected condition display
- 💡 Key insights and recommendations

### 4. 🎯 **Conditional Outcome Routing**

<table>
<tr>
<td width="50%">

#### 💚 Scenario A: Self-Care Plan
**For Mild Conditions**

- ✅ Step-by-step treatment plan
- ❌ Do's and Don'ts lists
- ⏰ Expected recovery timeline
- 📤 Share care plan option

</td>
<td width="50%">

#### 🏥 Scenario B: Doctor Alert
**For Severe Conditions**

- ⚠️ Warning banner with severity explanation
- 👨‍⚕️ Nearby dermatologists with ratings
- 📞 One-tap call functionality
- 🚨 Emergency information

</td>
</tr>
</table>

---

## 📁 Project Structure

```
📦 skin-diagnosis-app/
├── 📄 App.js                          # Main app with navigation setup
├── 📄 package.json                    # Dependencies & scripts
├── 📄 app.json                        # Expo configuration
├── 📄 babel.config.js                 # Babel configuration
├── 📂 context/
│   └── 🔄 DiagnosisContext.js        # Global state management
└── 📂 screens/
    ├── 🏠 LandingScreen.js           # Landing page
    ├── 🔐 SignInScreen.js            # Authentication
    ├── 📊 DashboardScreen.js         # Main dashboard
    ├── 📸 CameraScreen.js            # Step 1 of wizard
    ├── 📝 SymptomDetailsScreen.js    # Step 2 of wizard
    ├── 🤖 AnalysisScreen.js          # Step 3 of wizard
    ├── 💚 SelfCarePlanScreen.js      # Outcome A - Mild conditions
    └── 🏥 DoctorAlertScreen.js       # Outcome B - Severe conditions
```

---

## 🚀 Installation & Setup

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** or **yarn** - Package manager
- ✅ **Expo CLI** - Install globally:
  ```bash
  npm install -g expo-cli
  ```

### 📥 Installation Steps

<details open>
<summary><b>Step 1: Install Dependencies</b></summary>

```bash
cd "e:\new fyp code"
npm install
```

> 💡 **Tip:** If you encounter peer dependency issues, use `npm install --legacy-peer-deps`

</details>

<details open>
<summary><b>Step 2: Start Development Server</b></summary>

```bash
npm start
```

This will launch the Expo development server and display a QR code in your terminal.

</details>

<details open>
<summary><b>Step 3: Run on Device/Emulator</b></summary>

| Platform | Method |
|----------|--------|
| 📱 **iOS** | Press `i` or scan QR code with Expo Go app |
| 🤖 **Android** | Press `a` or scan QR code with Expo Go app |
| 🌐 **Web** | Press `w` |

</details>

---

## 🎓 Technical Highlights (for FYP Defense)

### 1. 🔥 **Heatmap Visualization**
> **Advanced Computer Vision Integration**

- 🎨 Toggle-based overlay showing AI attention areas
- 🧠 Demonstrates deep learning model interpretability
- 📍 **Location**: [AnalysisScreen.js](screens/AnalysisScreen.js)
- 🎯 **Purpose**: Visual explanation of AI decision-making process

### 2. 🧭 **Conditional Navigation Logic**
> **Intelligent Routing System**

Smart routing algorithm based on:
- 📊 **Severity level** (1-5 scale)
- 🎯 **AI confidence score** (0-100%)

**Decision Tree:**
```javascript
if (severity >= 4 || confidence <= 60%) {
  navigate('DoctorAlert');  // 🏥 Severe case
} else {
  navigate('SelfCarePlan');  // 💚 Mild case
}
```

📍 **Implementation**: [DiagnosisContext.js](context/DiagnosisContext.js)

### 3. 🔄 **Multi-Step Wizard Pattern**
> **State Management Excellence**

- 💾 State persistence across screens
- 🌐 Context API for global state management
- 🔗 Seamless data flow through diagnosis process
- ♻️ Reusable component architecture

### 4. 📸 **Camera Integration**
> **Native Device Feature Access**

- 📷 **expo-camera** for real-time capture
- 🖼️ Image picker fallback option
- 🔒 Permission handling system
- ⚡ Optimized image processing

---

## 📦 Dependencies

### 🎯 Core Technologies

| Package | Version | Purpose |
|---------|---------|---------|
| ![React](https://img.shields.io/badge/react-19.1.0-61DAFB?logo=react) | 19.1.0 | UI Framework |
| ![React Native](https://img.shields.io/badge/react--native-0.81.5-61DAFB?logo=react) | 0.81.5 | Mobile Framework |
| ![Expo](https://img.shields.io/badge/expo-SDK%2054-000020?logo=expo) | SDK 54 | Development Platform |

### 🧭 Navigation

- **@react-navigation/native**: ^6.1.9 - Navigation container
- **@react-navigation/stack**: ^6.3.20 - Stack navigator

### 🎨 UI Components

- **@react-native-community/slider**: 4.5.2 - Interactive sliders
- **react-native-gesture-handler**: ~2.16.1 - Touch gestures
- **react-native-screens**: ~3.31.1 - Screen optimization

### 📱 Device Features

- **expo-camera**: ~15.0.5 - Camera integration
- **expo-image-picker**: ~15.0.4 - Gallery access

### 💾 Storage

- **@react-native-async-storage/async-storage**: 1.23.1 - Local data storage

---

##  Future Enhancements

<table>
<tr>
<td width="50%">

### 🤖 AI & Backend
- 🧠 Connect to real ML model
  - TensorFlow Lite
  - PyTorch Mobile
- 🔐 Implement authentication
  - Firebase Auth
  - Auth0
- 🗄️ Build diagnosis history database
  - MongoDB
  - PostgreSQL

</td>
<td width="50%">

### 📱 Features & UX
- 🎥 Telemedicine integration
  - Video consultation
  - Real-time chat
- 🌍 Multi-language support
  - i18n implementation
- 📴 Offline mode
  - Local storage
  - Background sync

</td>
</tr>
</table>

---

<div align="center">

## 📄 License

**Academic Project** - Final Year Project (FYP)  
© 2026 All Rights Reserved

---

## 👨‍💻 Contact & Support

<p>
  <a href="mailto:your.email@example.com">
    <img src="https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/University-Academic%20Project-blue?style=for-the-badge&logo=academia&logoColor=white" alt="University">
  </a>
</p>

**For questions or support related to this FYP project, contact us.**

---

### ⭐ Star this project if you found it helpful!

Made with ❤️ and Help of Usman,Rohail,Wajhat And Kumail Lashari.

</div>
