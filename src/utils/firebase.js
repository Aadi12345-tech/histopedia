// Firebase configuration
let auth = null;
let googleProvider = null;
let app = null;

// Create mock objects for when Firebase is not available
const mockAuth = {
  signInWithPopup: async () => {
    console.log('Firebase auth not available, using mock');
    return {
      user: {
        uid: 'mock-uid',
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: null
      }
    };
  },
  signInWithEmailAndPassword: async () => {
    console.log('Firebase auth not available, using mock');
    return {
      user: {
        uid: 'mock-uid',
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: null
      }
    };
  }
};

const mockGoogleProvider = {
  setCustomParameters: () => {}
};

try {
  // Try to import Firebase - this will fail if Firebase is not installed
  const { initializeApp } = require('firebase/app');
  const { getAuth, GoogleAuthProvider } = require('firebase/auth');

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    // IMPORTANT: Replace with your actual Firebase config values
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };

  /*
  * SETUP INSTRUCTIONS:
  * 1. Go to https://console.firebase.google.com/
  * 2. Create a new project or use an existing one
  * 3. Add a web app to your project
  * 4. Copy the configuration values and replace the placeholders above
  * 5. Enable Authentication in the Firebase console
  * 6. Add Google as a sign-in method in the Authentication section
  */

  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();

  // Configure Google provider
  googleProvider.setCustomParameters({
    prompt: 'select_account' // Force account selection even when one account is available
  });

  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase not available, using mock implementation:', error);
  // Use mock objects
  auth = mockAuth;
  googleProvider = mockGoogleProvider;
  app = { name: 'mock-app' };
}

export { auth, googleProvider };
export default app; 