# 📊 IncEx Project Charts & Architecture (6 Variations)

This document presents **6 distinct visual and structural project chart variations** for the **IncEx (Income, Expense & Wealth Tracker)** PWA application.

---

## 1. System Architecture Flowchart

Visualizes the end-to-end data and execution flow from the client browser UI down to local PWA caches, Firebase Cloud services, and external AI models.

```mermaid
flowchart TD
    subgraph Client ["📱 Client-Side Progressive Web App (PWA)"]
        UI["🎨 HTML5 / TailwindCSS UI"]
        APP["⚡ Core Application Engine (js/app.js)"]
        SW["⚙️ Service Worker Cache (sw.js v14.0)"]
        CHARTS["📊 Chart.js Analytics Engine"]
    end

    subgraph Storage ["💾 Client Persistence"]
        LS["localStorage / Session Cache"]
    end

    subgraph Firebase ["☁️ Firebase Cloud Backend (BaaS)"]
        AUTH["🔐 Firebase Auth (Google OAuth / Email / Phone)"]
        DB["🗄️ Cloud Firestore NoSQL Database"]
    end

    subgraph AI ["🤖 Artificial Intelligence Engines"]
        GEMINI["⚡ Google Gemini 1.5 Flash API"]
        LOCAL_AI["🧠 Native Client NLP Solver Engine"]
    end

    UI --> APP
    APP <--> SW
    APP --> CHARTS
    APP <--> LS
    APP <--> AUTH
    APP <--> DB
    APP <--> GEMINI
    APP <--> LOCAL_AI
```

---

## 2. Technology Stack & Language Matrix

A comprehensive breakdown of all layers, technologies, languages, and purposes in the project.

| Layer | Language / Library | Technology | Key Purpose & Function |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | HTML5, CSS3 | Tailwind CSS, Lucide Icons | Responsive Midnight Indigo dark layout, dynamic cards, modals, and navigation |
| **App Logic** | JavaScript (ES6+) | Vanilla JS ES Modules | State management, transaction CRUD, metric math, UI reactive updates |
| **Analytics & Data Vis** | JavaScript | Chart.js | Interactive trend charts, expense breakdown pie charts, monthly comparison |
| **Authentication** | JavaScript, JSON | Firebase Auth SDK | Google 1-Tap OAuth, Email/Password sign-in, Phone OTP verification |
| **Cloud Database** | JavaScript, JSON | Cloud Firestore NoSQL | Real-time multi-device cloud sync for transactions, splits, and trip logs |
| **Offline PWA** | JavaScript | Service Worker API | Network-first caching strategy (`v14.0`), offline installation, PWA manifest |
| **AI Advisor** | REST / JSON | Google Gemini 1.5 Flash API | Live real-time AI financial advice, SIP calculation, stock insights |
| **PDF Reporting** | JavaScript, HTML5 | html2pdf.js / Window Print | Client-side generation of branded PDF financial statements |
| **Mobile Packaging** | ZIP / Android WebApp | IncEx Release APK (`v10.0`) | Standalone Android APK container for mobile installation |

---

## 3. Financial Data Flow & Transaction Sequence

Illustrates the step-by-step sequence when a user logs a new transaction or expense.

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 User
    participant UI as 📱 IncEx UI Form
    participant Engine as ⚡ App Engine (app.js)
    participant Local as 💾 LocalStorage
    participant Cloud as 🗄️ Firestore DB
    participant Visuals as 📊 Chart.js & DOM

    User->>UI: Fills Amount, Category, Type & Date
    User->>UI: Clicks "+ Add Transaction"
    UI->>Engine: Send form payload
    Engine->>Engine: Validate inputs & calculate new metrics
    Engine->>Local: Save payload to local memory state
    Engine->>Cloud: Asynchronously push document to Firestore
    Cloud-->>Engine: Confirm cloud save & return document ID
    Engine->>Visuals: Trigger re-render of Balance, Recent List & Charts
    Visuals-->>User: Display updated Available Balance & Toast Notification
```

---

## 4. Component Breakdown Structure (CBS)

Hierarchical breakdown of the core application modules and feature sets.

```mermaid
graph TD
    ROOT["📱 IncEx App Core"]

    ROOT --> AUTH["🔐 Auth & Profile Module"]
    AUTH --> A1["Google OAuth 2.0"]
    AUTH --> A2["Email / Password"]
    AUTH --> A3["Phone SMS OTP"]

    ROOT --> TX["💰 Transaction Manager"]
    TX --> T1["Income Logger"]
    TX --> T2["Expense Logger"]
    TX --> T3["Investment Tracker"]
    TX --> T4["Quick 1-Tap Chips"]

    ROOT --> DASH["📊 Analytics Dashboard"]
    DASH --> D1["Available Balance Display"]
    DASH --> D2["Income vs Expense Trend"]
    DASH --> D3["Category Pie Breakdown"]
    DASH --> D4["Empty State Containers"]

    ROOT --> AI_MOD["🤖 AI Advisor Hub"]
    AI_MOD --> AI1["Google Gemini 1.5 Flash API"]
    AI_MOD --> AI2["Native NLP Fallback Engine"]
    AI_MOD --> AI3["Highlight Typing Indicator"]

    ROOT --> SOCIAL["👥 Multi-User Hub"]
    SOCIAL --> S1["Bill Splitting Calculator"]
    SOCIAL --> S2["Group Trip Expense Logs"]
    SOCIAL --> S3["Group Live Chat"]

    ROOT --> REPORT["📄 Export & PWA System"]
    REPORT --> R1["PDF Statement Generator"]
    REPORT --> R2["Service Worker Cache v14.0"]
    REPORT --> R3["Android Release APK Package"]
```

---

## 5. Module Capability & Feature Matrix

Detailed technical specification matrix comparing storage modes, offline capabilities, and cloud sync.

| Module | Purpose | Storage Mode | Offline Support | Cloud Sync | Key Highlights |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Home Dashboard** | High-level metrics & recent activity | LocalStorage + Firestore | ✅ 100% Offline | ✅ Real-time | Prominent balance display, summary cards |
| **Transaction Logger** | Add income, expense, and investment | Local State + Firestore | ✅ 100% Offline | ✅ Real-time | Quick chips (`⛽ Fuel`, `🍔 Food`, `🛍️ Shop`) |
| **Analytics Hub** | Interactive visual charts | Client Canvas (Chart.js) | ✅ 100% Offline | N/A | Dynamic empty states when 0 data exists |
| **AI Advisor** | Personal financial guidance | API / Client Local Engine | ✅ Local Fallback | 🌐 Internet Needed | Google Gemini 1.5 Flash + Native NLP |
| **Bill Splitter** | Split expenses among friends | Local State + Firestore | ✅ 100% Offline | ✅ Real-time | Equal & custom percentage splits |
| **Trip Expense Hub** | Group trip tracking & chat | Firestore Shared Collections | 🌐 Network Preferred | ✅ Real-time | Live shared expense logs & group chat |
| **PDF Exporter** | Monthly financial statement export | Client-side DOM Render | ✅ 100% Offline | N/A | Suggested title `IncEx_Report_YYYY-MM-DD.pdf` |

---

## 6. Development Timeline & Release Roadmap

Gantt chart illustrating the project development phases, redesign, and final deployment.

```mermaid
gantt
    title IncEx Development & Release Timeline
    dateFormat YYYY-MM-DD
    section Phase 1: Core Foundation
    Basic HTML/CSS/JS Setup         :done, p1, 2026-08-01, 2026-08-05
    Firebase Auth & Firestore Integration :done, p2, 2026-08-05, 2026-08-09

    section Phase 2: Features & Rebranding
    Rebrand to IncEx & Git Remote Origin  :done, f1, 2026-08-10, 2026-08-12
    Bill Splitting & Trip Hub      :done, f2, 2026-08-12, 2026-08-14
    PDF Statement Exporter          :done, f3, 2026-08-14, 2026-08-15

    section Phase 3: UI Redesign & AI
    Spendly Midnight Indigo Redesign:done, u1, 2026-08-15, 2026-08-16
    PWA Cache Busting (v14.0)       :done, u2, 2026-08-16, 2026-08-16
    Google Gemini 1.5 AI Integration :done, ai1, 2026-08-16, 2026-08-16
    Highlighted Typing Indicator    :done, ai2, 2026-08-16, 2026-08-16

    section Phase 4: Release & Packaging
    Build Release APK (v10.0)       :done, r1, 2026-08-16, 2026-08-16
    Desktop Zip Packages Generation :done, r2, 2026-08-22, 2026-08-22
```
