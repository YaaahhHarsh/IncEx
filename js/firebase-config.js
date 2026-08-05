/**
 * Firebase Backend & Auth Configuration Module for MyExpense
 */

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDemoApiKeyForMyExpenseApp12345",
  authDomain: "myexpense-app-demo.firebaseapp.com",
  projectId: "myexpense-app-demo",
  storageBucket: "myexpense-app-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:demo1234567890"
};

class FirebaseService {
  constructor() {
    this.app = null;
    this.auth = null;
    this.db = null;
    this.isInitialized = false;
    this.isDemoMode = true;

    this.init();
  }

  init() {
    try {
      if (typeof window.firebase !== 'undefined') {
        const savedConfig = localStorage.getItem('myexpense_firebase_config');
        const config = savedConfig ? JSON.parse(savedConfig) : DEFAULT_FIREBASE_CONFIG;

        if (!window.firebase.apps.length) {
          this.app = window.firebase.initializeApp(config);
        } else {
          this.app = window.firebase.app();
        }

        this.auth = window.firebase.auth();
        this.db = window.firebase.firestore();
        this.isInitialized = true;
        
        this.db.enablePersistence({ synchronizeTabs: true }).catch(err => {
          // Ignore persistence errors on multiple tabs
        });

        console.log("🔥 Firebase initialized successfully.");
      } else {
        console.warn("⚠️ Firebase SDK CDN not detected. Operating in local storage mode.");
      }
    } catch (error) {
      console.warn("⚠️ Firebase initialization notice: Local fallback mode active.", error.message);
      this.isDemoMode = true;
    }
  }

  saveCustomConfig(config) {
    try {
      localStorage.setItem('myexpense_firebase_config', JSON.stringify(config));
      alert("Firebase configuration saved! Reloading application...");
      window.location.reload();
    } catch (e) {
      alert("Failed to save Firebase config: " + e.message);
    }
  }

  resetConfig() {
    localStorage.removeItem('myexpense_firebase_config');
    alert("Reset to default Firebase configuration. Reloading...");
    window.location.reload();
  }
}

// Global window attachment
window.DEFAULT_FIREBASE_CONFIG = DEFAULT_FIREBASE_CONFIG;
window.firebaseService = new FirebaseService();
