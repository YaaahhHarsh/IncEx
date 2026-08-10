const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyD3SA4sdPnbcs5V44YJhd0z0b77e-ISJJE",
  authDomain: "myexpense-42695.firebaseapp.com",
  projectId: "myexpense-42695",
  storageBucket: "myexpense-42695.firebasestorage.app",
  messagingSenderId: "629939635112",
  appId: "1:629939635112:web:a18285083a10b74042539d"
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
        const savedConfig = localStorage.getItem('KoshWise_firebase_config');
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
      localStorage.setItem('KoshWise_firebase_config', JSON.stringify(config));
      alert("Firebase configuration saved! Reloading application...");
      window.location.reload();
    } catch (e) {
      alert("Failed to save Firebase config: " + e.message);
    }
  }

  resetConfig() {
    localStorage.removeItem('KoshWise_firebase_config');
    alert("Reset to default Firebase configuration. Reloading...");
    window.location.reload();
  }
}

window.DEFAULT_FIREBASE_CONFIG = DEFAULT_FIREBASE_CONFIG;
window.firebaseService = new FirebaseService();
