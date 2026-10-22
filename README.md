# VisionFit TV — Amazon Fire TV Fitness Companion

<div align="center">

![VisionFit TV Banner](https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80)

**A production-minded, AI-assisted living-room fitness experience designed specifically for the Amazon Fire TV ecosystem and a 10-foot viewing distance.**

[![Amazon Developer Hackathon](https://img.shields.io/badge/Amazon_Developer-Build%2C_Ship%2C_Shape_2026-orange?style=for-the-badge&logo=amazon)](https://developer.amazon.com/)
[![Track: Fire TV](https://img.shields.io/badge/Hackathon_Track-Fire_TV-blueviolet?style=for-the-badge)](https://developer.amazon.com/fire-tv)
[![Frontend](https://img.shields.io/badge/Frontend-React_19_%2B_Vite_%2B_Tailwind_v4-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI_%2B_SQLite3-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel_Multi--Services-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Platform](https://img.shields.io/badge/Platform-Fire_OS_7%2F8_%7C_Web_Leanback-232F3E?style=for-the-badge)](https://developer.amazon.com/docs/fire-tv/fire-os-overview.html)

</div>

---

> [!IMPORTANT]
> **Independent Hackathon Disclaimer:** VisionFit TV is an independent proof of concept created for the **Amazon Developer “Build, Ship, Shape” 2026 Hackathon (Fire TV Track)**. It is not endorsed, sponsored, approved, or officially adopted by Amazon.com, Inc.

---

## 📋 Table of Contents

- [1. Executive Vision](#1-executive-vision)
- [2. The 10-Foot Television Experience](#2-the-10-foot-television-experience)
- [3. Application Screens & Features](#3-application-screens--features)
  - [A. Home Screen](#a-home-screen)
  - [B. Workout Discovery](#b-workout-discovery)
  - [C. Custom Workout Setup Wizard](#c-custom-workout-setup-wizard)
  - [D. Active Workout Runner](#d-active-workout-runner)
  - [E. AI Fitness Coach](#e-ai-fitness-coach)
  - [F. Progress & History Dashboard](#f-progress--history-dashboard)
  - [G. Settings & System Calibrations](#g-settings--system-calibrations)
  - [H. Fire TV Remote Simulator Overlay](#h-fire-tv-remote-simulator-overlay)
- [4. Technical Architecture](#4-technical-architecture)
- [5. Vercel Multi-Services Configuration](#5-vercel-multi-services-configuration)
- [6. Fire TV Deployment & Packaging](#6-fire-tv-deployment--packaging)
  - [Option A: Amazon Web App Tester (W3C Web App)](#option-a-amazon-web-app-tester-w3c-web-app)
  - [Option B: Native Fire OS Leanback TV APK](#option-b-native-fire-os-leanback-tv-apk)
  - [Fire TV Remote Keycodes](#fire-tv-remote-keycodes)
- [7. Quickstart & Installation](#7-quickstart--installation)
- [8. Hackathon Demonstration Journey](#8-hackathon-demonstration-journey)
- [9. Automated Test Suite](#9-automated-test-suite)
- [10. Long-Term Amazon Ecosystem Vision](#10-long-term-amazon-ecosystem-vision)

---

## 1. Executive Vision

Living-room workouts have historically suffered from the "smartphone dilemma": users prop up a tiny 6-inch phone on a coffee table or floor, squinting at exercise timers while straining their necks during movement intervals.

**VisionFit TV** transforms the largest, highest-definition screen in the home into an interactive fitness companion. Designed from the ground up for **Amazon Fire TV**, it delivers:
- **Zero Touchscreen Dependency:** 100% operable with standard Fire TV remote controls (D-Pad, Select, Back, Play/Pause).
- **Sensor-Optional Core:** Functions flawlessly with zero required cameras, wearables, or external sensors, with an optional optical flow repetition tracker when camera access is available.
- **Evidence-Based Sports Science:** Built-in AI coaching engine that adapts workout intensity based on post-exercise fatigue ratings and recovery requirements.
- **Inclusive Accessibility:** Instant one-click low-impact alternative exercises for knee and joint safety.

---

## 2. The 10-Foot Television Experience

VisionFit TV is specifically tailored for a 10-foot viewing distance in accordance with the official **Amazon Fire TV Design Guidelines**:

- **Color Palette:** Deep charcoal background (`#0B0D11`) with high-contrast, restrained **Electric Lime** (`#D4FF00`) and **Warm Amber** accents.
- **Typography:** High-legibility typography readable across the room (40px+ headers, 18px body copy, 96px tabular timers).
- **Overscan Title Safe Areas:** 5% safety margin insets (configurable to 3% or 0% in Settings) to prevent TV bezel clipping.
- **Spatial Focus Navigation:** High-contrast outline borders (`#D4FF00`), subtle scale zoom (`1.04x`), and smooth spatial auto-scrolling.
- **Acoustic Feedback:** Low-latency 3-2-1 countdown signals and interval chimes synthesized locally via the **Web Audio API** with zero network buffering lag.

---

## 3. Application Screens & Features

```
+───────────────────────────────────────────────────────────────────────────+
|                               VISIONFIT TV                                |
+───────────────────────────────────────────────────────────────────────────+
|  [Home]  [Discover]  [Custom Setup]  [AI Coach]  [Progress]  [Settings]   |
+───────────────────────────────────────────────────────────────────────────+
```

### A. Home Screen
- **Cinematic Hero:** Showcases featured routines (e.g. *Ignite 360: Full Body MetCon*) with calorie burn, duration, and one-click launch.
- **Session Resume Banner:** Prompts to resume paused workouts with exact elapsed time and exercise index.
- **Streak & Volume Widget:** Real-time day streak counter, 150-minute weekly target progress bar, and live TV clock.
- **Horizontal Swimlanes:** "Personalized For You", "Quick & Punchy (<15m)", and "Mobility & Posture Reset".

### B. Workout Discovery
- **Discipline Filter Tabs:** HIIT & Cardio, Strength, Mobility, Core Armor, and Restorative Recovery.
- **Remote Quick-Tag Chips:** Single-click filters for "No Equipment", "Beginner Friendly", "Under 15 Mins", and "Full Body".
- **Detailed Preview Modal:** Complete exercise breakdown, interval timings, target muscle maps, and joint-friendly accessible alternatives.

### C. Custom Workout Setup Wizard
- Interactive 4-step TV wizard allowing users to tailor:
  1. **Duration:** 10m, 15m, 20m, 30m.
  2. **Fitness Goal:** Fat Burn, Muscle Strength, Mobility, Core Power.
  3. **Intensity Level:** Beginner (relaxed rest), Intermediate (balanced tempo), Advanced (high output).
  4. **Available Equipment:** Bodyweight only, Medium Dumbbells, Resistance Bands, Yoga Mat.
- Dynamically compiles a balanced routine and launches it directly into the player.

### D. Active Workout Runner
- **10-Foot Giant Countdown Timer:** 96px tabular countdown with 3-2-1 acoustic beeps and phase badges (`GET READY`, `WORK`, `REST`).
- **Biomechanical Exercise Animator:** 100% vector SVG movement demonstrations showing accurate joint angles and active muscle highlights.
- **Accessible Low-Impact Alternative Button:** Immediate swap to joint-friendly modifications (e.g., Jumping Jacks $\to$ Step Jacks, Air Squats $\to$ Chair Box Squats).
- **Rep Tracking Module:** Toggle between standard rhythm tempo, simulated rep cadence, or live webcam optical flow frame detection.
- **Session Auto-Save & Rating:** Calculates active duration and calories burned, with post-workout rating (`Easy`, `Just Right`, `Very Tough`).

### E. AI Fitness Coach
- **Dual-Mode Engine:**
  - *Local Sports Science Engine (Deterministic):* Built-in exercise physiology rules that adjust volume based on streak history and fatigue without requiring external API keys.
  - *Connected Model Interface:* Bridges to backend LLM endpoints when API credentials are configured.
- **Quick TV Remote Queries:** Pre-configured prompt chips for squat knee alignment, active recovery protocols, and custom plan synthesis.
- **Actionable Workout Cards:** Generates executable workouts directly launchable from the chat interface.

### F. Progress & History Dashboard
- **Consistency Tracking:** Active streak counter and 150-minute weekly target ring.
- **Weekly Activity Chart:** High-contrast 7-day volume bar chart.
- **Training Discipline Split:** Breakdown across HIIT, Strength, Mobility, and Core.
- **Full History Log:** Filterable list of completed sessions with dates, durations, and ratings.

### G. Settings & System Calibrations
- **TV Safe Margin:** Toggle between 5% (Fire TV Standard), 3% (Tight TV), and 0% (Monitors).
- **Audio Preferences:** Toggle voice coach announcements and countdown acoustic beeps.
- **Data Management:** Full JSON data export and demo data reset.
- **Fire TV Remote Mapping Reference:** Explains all remote controller bindings.

### H. Fire TV Remote Simulator Overlay
- Press **`R`** on the keyboard or click the floating "Remote Simulator" pill.
- Features a realistic virtual Fire TV Remote with D-Pad, Select, Back, Home, and Play/Pause buttons for desktop evaluation.

---

## 4. Technical Architecture

```
+───────────────────────────────────────────────────────────────────────────+
|                        VISIONFIT TV ARCHITECTURE                          |
+───────────────────────────────────────────────────────────────────────────+
|                                                                           |
|   ┌───────────────────────────────────────────────────────────────────┐   |
|   │                     10-Foot Fire TV Frontend                      │   |
|   │  - React 19 + TypeScript + Vite 8 + Tailwind CSS v4               │   |
|   │  - Spatial Navigation Engine (D-Pad, Select, Back, MediaKeys)     │   |
|   │  - Web Audio API Sound Synthesizer + Web Speech TTS               │   |
|   │  - SVG Biomechanical Vector Animator                              │   |
|   │  - Virtual Fire TV Remote Controller Simulator (Toggle [R])       │   |
|   └─────────────────────────────────┬─────────────────────────────────┘   |
|                                     │                                     |
|             ┌───────────────────────┴─────────────────────────┐           |
|             ▼                                                 ▼           |
|   ┌─────────────────────────┐                     ┌───────────────────┐   |
|   │ Local Persistence Layer │                     │  FastAPI Backend  │   |
|   │  - LocalStorage / IDB   │                     │  - Python 3.14    │   |
|   │  - Session Backup Sync  │                     │  - SQLite3 Engine │   |
|   │  - Zero-Cloud Fallback  │                     │  - REST Endpoints │   |
|   └─────────────────────────┘                     └─────────┬─────────┘   |
|                                                             │             |
|                                                             ▼             |
|                                                   ┌───────────────────┐   |
|                                                   │ AI Coach Service  │   |
|                                                   │  - Sports Science │   |
|                                                   │  - Deterministic  │   |
|                                                   │  - Optional LLM   │   |
|                                                   └───────────────────┘   |
+───────────────────────────────────────────────────────────────────────────+
```

---

## 5. Vercel Multi-Services Configuration

VisionFit TV is configured as a multi-service Vercel deployment with independent frontend and backend services:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "app": {
      "root": ".",
      "framework": "vite",
      "bindings": [
        {
          "type": "service",
          "service": "server",
          "format": "url",
          "env": "SERVER_URL"
        }
      ]
    },
    "server": {
      "root": "server",
      "framework": "fastapi",
      "entrypoint": "main:app"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": {
        "service": "server"
      }
    },
    {
      "source": "/(.*)",
      "destination": {
        "service": "app"
      }
    }
  ]
}
```

- **`app` Service:** Serves the 10-foot Vite SPA at `/(.*)`.
- **`server` Service:** Serves the FastAPI Python backend at `/api/(.*)`.
- **Internal Binding:** Declared on `app` with `SERVER_URL`, resolved at runtime via [`src/services/apiConfig.ts`](./src/services/apiConfig.ts).

---

## 6. Fire TV Deployment & Packaging

### Option A: Amazon Web App Tester (W3C Web App)

The fastest and official method to test VisionFit TV on physical Fire TV hardware:

1. **Start the Production Web Server:**
   ```bash
   cd visionfit-tv
   npm run build
   npm run preview -- --host 0.0.0.0 --port 3000
   ```
2. **Install Web App Tester:**
   Search for **"Web App Tester"** in the Amazon Appstore on your Fire TV device.
3. **Load Application:**
   Enter Title: `VisionFit TV`, URL: `http://<YOUR_LOCAL_IP>:3000`, and select **Save and Test**.
4. Uses `public/manifest.json` and `public/amazon-webapp-config.json`.

### Option B: Native Fire OS Leanback TV APK

To build an installable APK for Fire OS:
1. Initialize Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "VisionFit TV" "com.visionfit.tv" --web-dir dist
   npx cap add android
   ```
2. Copy `firetv/android/AndroidManifest.xml` to `android/app/src/main/AndroidManifest.xml`.
3. Build and install via ADB:
   ```bash
   cd android && ./gradlew assembleDebug
   adb connect <FIRE_TV_IP>:5555
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   ```

### Fire TV Remote Keycodes

| Remote Button | Android Keycode | Web Key Event | VisionFit Action |
|---|---|---|---|
| **D-Pad Up** | `KEYCODE_DPAD_UP` (19) | `ArrowUp` | Move focus upward |
| **D-Pad Down** | `KEYCODE_DPAD_DOWN` (20) | `ArrowDown` | Move focus downward |
| **D-Pad Left** | `KEYCODE_DPAD_LEFT` (21) | `ArrowLeft` | Move focus left / Rewind |
| **D-Pad Right** | `KEYCODE_DPAD_RIGHT` (22) | `ArrowRight` | Move focus right / Fast Forward |
| **Center Select** | `KEYCODE_DPAD_CENTER` (23) | `Enter` | Select / Activate |
| **Back** | `KEYCODE_BACK` (4) | `Escape` / `Backspace` | Close modal / Back to Home |
| **Play / Pause** | `KEYCODE_MEDIA_PLAY_PAUSE` (85) | `MediaPlayPause` / `Space` | Pause or Resume workout |
| **Menu** | `KEYCODE_MENU` (82) | `ContextMenu` / `m` | Quick options |

---

## 7. Quickstart & Installation

### Prerequisites
- Node.js 18+ (tested on Node v24.19.0)
- Python 3.10+ (tested on Python 3.14.7)

### 1. Clone & Install Frontend
```bash
git clone https://github.com/mbajiya047/VisionFit.git
cd VisionFit
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

> **Desktop Testing Tip:** Press **`R`** to toggle the on-screen **Fire TV Remote Simulator**!

### 2. Run the FastAPI Backend (Optional)
```bash
cd server
pip install -r requirements.txt
python main.py
```
API docs available at `http://localhost:8000/docs`.

---

## 8. Hackathon Demonstration Journey

Judges and evaluators can follow this complete user journey:

1. **Step 1 — Launch & First Impression:** Open `http://localhost:3000`. Observe the cinematic hero, 4-day streak counter, and 10-foot typography.
2. **Step 2 — Remote Control Navigation:** Use physical **Arrow Keys** to scroll into the swimlane. Notice the Electric Lime focus border (`#D4FF00`).
3. **Step 3 — Inspect Workout Breakdown:** Focus on **"Ignite 360: Full Body MetCon"** and press **Enter**. The preview modal displays 6 exercises, target muscles, and accessible alternatives.
4. **Step 4 — Custom Setup Wizard:** Navigate to **Custom Workout**. Select **10 Mins**, **Fat Burn**, **Beginner**, and **No Equipment**. Click **Launch Workout**.
5. **Step 5 — Interactive Workout Execution:** Observe the 3-2-1 acoustic countdown and spoken announcement. Watch the vector exercise animation.
   - Click **"Use Low-Impact Variant"** to see immediate exercise substitution.
   - Click **"+15s"** to extend the timer.
   - Toggle **"Rep Tracking"** to test optical motion flow or rhythm cadence.
6. **Step 6 — Completion & Difficulty Rating:** Click **"Finish Early"** or let the timer complete. Confetti celebrates the session. Select difficulty rating **"Just Right"** and click **Save & View Progress**.
7. **Step 7 — Persistent Stats & AI Adaptation:** Review the updated weekly chart and streak in **Progress**. Navigate to **AI Coach** and click **"Recommend workout based on my streak"**. The coach acknowledges your completed session and recommends an active recovery flow.

---

## 9. Automated Test Suite

VisionFit TV includes an automated Python test suite verifying database persistence, streak calculations, sports science recommendations, and API health:

```bash
python tests/test_visionfit.py
```

```
......
----------------------------------------------------------------------
Ran 6 tests in 0.075s

OK
```

---

## 10. Long-Term Amazon Ecosystem Vision

VisionFit TV is designed as a foundational proof of concept that demonstrates the future of television wellness:

- **Alexa Voice Integration:** Future versions could integrate the `Alexa.Fitness` skill interface for voice commands (*"Alexa, pause workout"*, *"Alexa, show accessible alternative"*).
- **Amazon Halo & BLE Device Telemetry:** Optional Bluetooth Low Energy (BLE) heart rate monitor integration.
- **Fire TV Live Channel Guide Integration:** Scheduled group living-room workouts synchronized across Fire TV households.

---

<div align="center">

**VisionFit TV — Amazon Developer Hackathon 2026**  
*Built with passion by Mohit Bajiya for the Fire TV Track.*

</div>
