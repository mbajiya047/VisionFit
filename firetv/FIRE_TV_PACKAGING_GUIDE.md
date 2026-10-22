# VisionFit TV — Amazon Fire TV Packaging & Deployment Guide

**Hackathon Track:** Amazon Developer “Build, Ship, Shape” 2026 — Fire TV Track  
**Platform Target:** Amazon Fire OS 7 / 8 (Fire TV Stick 4K, Fire TV Cube, Fire TV Smart TVs)

---

## Overview

VisionFit TV is engineered specifically as a **10-foot Living Room UI** that complies with Amazon Fire TV Design Guidelines:
1. **Remote Navigation First:** 100% operable via Fire TV Remote (D-Pad directional ring, Center Select, Back, Play/Pause).
2. **TV Overscan Title Safe Area:** Default 5% safety margin insets (configurable to 3% or 0% in Settings).
3. **Hardware Acceleration:** Lightweight CSS/SVG animations tuned for 60 FPS on low-power TV chipsets.
4. **Sensor-Optional:** Complete workout tracking with zero required external cameras or sensors, plus optional computer vision rep assist where permitted.

---

## Deployment Option 1: Amazon Web App Tester (Recommended Official Method)

Amazon provides the **Amazon Web App Tester** app on the Fire TV Appstore, allowing developers to test HTML5/Web applications on physical Fire TV hardware without building native APKs.

### Step-by-Step Instructions:

1. **Start the VisionFit TV Web Server:**
   On your developer development machine:
   ```bash
   cd visionfit-tv
   npm run build
   npm run preview -- --host 0.0.0.0 --port 3000
   ```
   *Note your machine's local IP address (e.g. `http://192.168.1.50:3000`).*

2. **Install Amazon Web App Tester on your Fire TV:**
   - On your Fire TV device, search for **"Web App Tester"** in the Amazon Appstore and install it.

3. **Load VisionFit TV into the Tester:**
   - Launch **Web App Tester** on Fire TV.
   - Click **Add URL**.
   - Enter:
     - **Title:** `VisionFit TV`
     - **URL:** `http://<YOUR_LOCAL_IP>:3000`
   - Select **Save and Test**.

4. **Verify Fire TV Remote Controls:**
   - **D-Pad (Up/Down/Left/Right):** Smoothly moves focus between workout cards, tabs, and buttons.
   - **Center Select (Enter):** Activates controls, starts workouts, or expands modals.
   - **Back Button:** Closes modals or returns to the Home screen.
   - **Play/Pause Button:** Pauses and resumes active workout intervals.

---

## Deployment Option 2: Native Fire OS Leanback TV APK

To build a standalone installable APK (`.apk`) for Fire OS:

1. **Install Capacitor CLI:**
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "VisionFit TV" "com.visionfit.tv" --web-dir dist
   ```

2. **Add Android Platform:**
   ```bash
   npm run build
   npx cap add android
   ```

3. **Apply the Fire TV Leanback Manifest:**
   - Copy `firetv/android/AndroidManifest.xml` into `android/app/src/main/AndroidManifest.xml`.
   - This registers `android.intent.category.LEANBACK_LAUNCHER` and `android.hardware.type.television`.

4. **Build the APK:**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   The APK is generated at: `android/app/build/outputs/apk/debug/app-debug.apk`.

5. **Sideload via ADB to Fire TV:**
   - Enable **Developer Options** and **ADB Debugging** on Fire TV:
     `Settings > My Fire TV > Developer Options > ADB Debugging: ON`
   - Connect via ADB over Wi-Fi:
     ```bash
     adb connect <FIRE_TV_IP_ADDRESS>:5555
     adb install -r app-debug.apk
     ```
   - VisionFit TV will appear in the **Your Apps & Channels** row on the Fire TV Home Screen with its TV Leanback banner!

---

## Fire TV Remote Keycode Reference

VisionFit TV maps the standard Android / Fire OS keycodes:

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

## Desktop Evaluation Mode (Virtual Fire TV Remote)

For evaluators reviewing this application without a physical Fire TV connected:
- An **interactive on-screen Fire TV Remote Controller** is integrated directly into the UI.
- Press **`R`** on the keyboard or click the floating **"Remote Simulator"** badge in the bottom right corner.
- Click the virtual D-Pad buttons or use physical arrow keys + Enter to experience the exact 10-foot TV spatial navigation flow!
