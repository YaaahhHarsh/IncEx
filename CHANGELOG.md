# MyExpense • Application Version History & Change Log

---

## 📌 Version 4.0 (Latest Release - Firebase Console & AI Advisor)
**Folder**: `Versions/Version_4.0_FirebaseConsole_And_AIAdvisor/`
**ZIP Package**: `MyExpense_v4.0_Final.zip` (In Downloads & Desktop)

### ✨ Features & Changes:
1. **Firebase Authentication Integration**:
   - Integrated Firebase Console Google OAuth and Email/Password sign-in.
   - Connected `onAuthStateChanged` real-time listener for seamless cloud authentication.
2. **AI Financial Advisor Chatbot**:
   - Added interactive AI Assistant screen with quick suggestion chips (50/30/20 Rule, Low Risk Investments, Cutting Expenses, Emergency Funds, Tax 80C).
   - Contextual financial guidance analyzing the user's active account metrics.
3. **Full PDF Financial Report Generator**:
   - Downloadable PDF statement with official header, account info, balance scorecards, category summary, and full itemized transaction history table.
4. **Elevated FAB Button**:
   - Fixed floating `+` button placement with 7rem bottom offset for 100% visibility above the bottom navigation bar.

---

## 📌 Version 3.0 (Blank Account & Vector SVG Icons)
**Folder**: `Versions/Version_3.0_BlankAccount_And_VectorIcons_Final/`

### ✨ Features & Changes:
1. **Create New Blank Account Mode**:
   - Added an explicit toggle button on the Auth screen.
   - New registered accounts start with a **100% Blank Slate** (`₹0.00` balance, 0 transactions).
2. **Account-Keyed Data Isolation**:
   - Stored transactions specifically under `myexpense_transactions_<user_uid>`.
3. **Embedded Vector SVG Icons**:
   - Clean embedded vector SVGs for all balance cards, navigation tabs, and modal buttons.

---

## 📌 Version 2.0 (Firebase & Cloud Sync Release)
**Folder**: `Versions/Version_2.0_Firebase_MultiUser/`

### ✨ Features & Changes:
1. **Firebase SDK Integration**:
   - Added Google OAuth, Email/Password, and Phone OTP auth modules.
2. **App Branding & Logo**:
   - Renamed app to **MyExpense** with custom logo (`assets/logo.png`).

---

## 📌 Version 1.0 (Initial Base Release)
**Folder**: `Versions/Version_1.0_Base_FinanceTracker/`

### ✨ Features & Changes:
1. **Core Finance Tracker Foundation**:
   - White & Emerald Green responsive design system.
   - Income, Expense, and Investment logging modal.
