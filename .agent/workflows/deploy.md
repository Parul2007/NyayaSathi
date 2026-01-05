---
description: Steps to build and publish the NyayaSathi website to Firebase Hosting
---

# Deploying NyayaSathi to Firebase Hosting

Follow these steps to build your production bundle and publish it live.

### 1. Prerequisites
Ensure you have the Firebase CLI installed:
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
// turbo
```bash
firebase login
```

### 3. Build the Application
This creates an optimized production build in the `dist` folder.
// turbo
```bash
npm run build
```

### 4. Deploy to Firebase
This command uploads your `dist` folder to Firebase Hosting.
// turbo
```bash
firebase deploy --only hosting
```

### 5. Important: Firebase Console Setup
After deployment, ensure the following are enabled in the [Firebase Console](https://console.firebase.google.com/):

1. **Authentication**: Go to Build > Authentication > Sign-in method.
   - Enable **Email/Password**.
   - Enable **Google** (this will resolve the `auth/configuration-not-found` error).
2. **Firestore**: Go to Build > Firestore Database.
   - Ensure you have "Start in Test Mode" or apply the `firestore.rules` provided in this project.
3. **Storage**: Go to Build > Storage.
   - Ensure the bucket is initialized.
