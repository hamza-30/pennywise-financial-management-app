# PennyWise | Personal Finance Tracker

A web application for tracking daily income and expenses. Built with React and Firebase, it calculates your actual bank balance by combining a starting total with your transaction history. It features real-time updates, simple spending charts, and a CSV export for your records.

### Demo: https://pennywise-money.vercel.app/

---

## 🛠️ Technical Stack
* **Frontend:** React (Vite), Tailwind CSS, Framer Motion
* **State Management:** React Context API
* **Backend:** Firebase (Authentication & Firestore NoSQL)
* **Visualization:** Recharts
* **Forms & Validation:** React Hook Form
* **Feedback:** React Hot Toast
* **Icons:** React Icons

---

## 📸 Feature Showcase

### 🏠 Intelligent Dashboard
The command center for your finances. Features a **Smart Nudge** system that detects account states and guides users through initialization.
* **Real-Time Stats:** Automated calculation of **Running Total Balance**, **Monthly Income**, and **Monthly Expenses**.
* **Working Capital Visualization:** Dual-axis `AreaChart` tracking cash flow and burn rates using Recharts.
* **Framer Motion Nudges:** Spring-animated alerts for empty states to improve user onboarding.



### 📊 Advanced Time-Series Analytics
State-of-the-art data processing for deep financial insights.
* **Period-over-Period Performance:** Automated "Average Daily Spending" comparison to track habit shifts.
* **Dynamic Data Aggregation:** Uses `useMemo` hooks and `reduce` algorithms to transform raw Firestore collections into visual trends on the fly.
* **JavaScript Date Safety:** Custom logic ensures 100% accuracy for 31-day months and leap years.



### ⚙️ Secure Data Management & Export
* **Dual-State Transaction Engine:** A unified Modal system handling both creation and editing with high-fidelity validation.
* **Data Portability:** Client-side CSV engine using `Blob` and `Object.URL` APIs for instant record exporting.
* **Reactive Feedback:** Integrated `react-hot-toast` for real-time feedback on all database operations (Auth, CRUD, Batch).

---

## 🧠 Technical Engineering Highlights

### 1. The Reactive Data Layer (`onSnapshot`)
PennyWise implements a "Subscription Pattern" for state. By wrapping `onAuthStateChanged` and Firestore `onSnapshot` inside a Global Context, the application maintains a persistent, real-time link to the database. Changes made in **Settings** (like a budget update) propagate to the **Dashboard** and **Analytics** instantly without a page refresh.

### 2. Optimized Database Scalability (Batch Operations)
To avoid the $500$ document limit of standard Cloud Firestore operations, the "Delete All" feature utilizes a **Chunked Batch Deletion** algorithm. This slices large datasets into manageable chunks and commits them via `writeBatch`, ensuring the app remains performant as the user's ledger grows.

### 3. Logic-Proof Financial Math
* **Rollover Correction:** Prevents the "1st of the Month" reset bug by separating **All-Time Net Worth** from **Monthly Expense Habits**.
* **Type-Safe Reducers:** Sanitizes Firestore string inputs into numeric values during the aggregation phase to prevent `NaN` errors in financial reporting.

---

## ⚡ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone "https://github.com/hamza-30/pennywise-financial-management-app.git"
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    VITE_FIREBASE_API_KEY=your_key
    VITE_FIREBASE_AUTH_DOMAIN=your_domain
    VITE_FIREBASE_PROJECT_ID=your_id
    VITE_FIREBASE_STORAGE_BUCKET=your_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```
4.  **Start Development Server:**
    ```bash
    npm run dev
    ```

## Preview

<video src="https://github.com/user-attachments/assets/14dc4726-f1c0-4aa8-8c29-e8e2e27d004a" width="100%" controls></video>
