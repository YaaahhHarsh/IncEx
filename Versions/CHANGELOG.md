# MyExpense • Application Version History & Change Log

---

## 📌 Version 3.0 (Latest Final Release)
**Folder**: `Versions/Version_3.0_BlankAccount_And_VectorIcons_Final/`
**ZIP Package**: `MyExpense_v3.0_Final.zip` (In Downloads & Desktop)

### ✨ Features & Changes:
1. **Create New Blank Account Mode**:
   - Added an explicit toggle button on the Auth screen.
   - When a new user registers (e.g. `rahul@gmail.com`), they get a **100% Blank Slate** (`₹0.00` balance, 0 transactions, clean zero-state charts).
2. **Account-Keyed Data Isolation**:
   - Stored transactions specifically under `myexpense_transactions_<user_uid>`.
   - Switching accounts restores that specific account's stored transactions accurately.
3. **Embedded Vector SVG Icons**:
   - Replaced CDN-dependent icon rendering with clean embedded vector SVGs for all balance cards, navigation bar tabs, and modal buttons. Icons never disappear or render blank offline.
4. **Multi-Currency Support**:
   - Real-time dropdown selector for `₹` (INR), `$` (USD), `€` (EUR), `£` (GBP), `AED`, etc.

---

## 📌 Version 2.0 (Firebase & Cloud Sync Release)
**Folder**: `Versions/Version_2.0_Firebase_MultiUser/`

### ✨ Features & Changes:
1. **Firebase v10 Compatibility SDK Integration**:
   - Added Google OAuth, Email/Password, and Phone OTP auth modules.
   - Integrated Cloud Firestore real-time snapshot sync (`onSnapshot`).
2. **App Branding & Logo**:
   - Renamed app to **MyExpense**.
   - Integrated custom uploaded logo image (`assets/logo.png`) into favicon, Auth header, and main top navigation bar.

---

## 📌 Version 1.0 (Initial Base Release)
**Folder**: `Versions/Version_1.0_Base_FinanceTracker/`

### ✨ Features & Changes:
1. **Core Finance Tracker Foundation**:
   - White & Emerald Green responsive design system.
   - Income, Expense, and Investment logging modal with category selection.
   - Monthly budget cap setter and real-time over-budget alert banner.
   - Financial analytics charts powered by Chart.js.
