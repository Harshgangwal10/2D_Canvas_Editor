# Simple 2D Canvas Editor
##  Features
**Home Page**

  * Simple landing page
  * Create a new canvas with a button
  * Each new canvas generates a unique Firestore document ID (`canvasId`) and opens the editor at `/canvas/:canvasId`

* **Canvas Editor**

  * Add Rectangles, Circles, Text, and a Pen tool
  * Move, resize, rotate, and delete objects
  * Edit text content and object colors
  * Save canvas state to Firestore and reload it on page revisit
  * Supports continuous editing via URL

## Tech Stack

* **React** - Frontend UI framework
* **Fabric.js** - Canvas rendering and manipulation
* **Firebase Firestore** - Backend storage (No Auth required)

##  Installation

1. **Clone the repository**

```bash
git clone <repo-url>
cd <repo-folder>
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Firebase**

   * Create a Firebase project 
   * Create a Firestore database
   * Create a `.env` file in the root of your project:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

* Add `.env` to `.gitignore` to avoid committing secrets.

4. **Configure Firebase in `src/config/firebase.js`:**
   

**Also add loadCanvas and saveCanvas function here**

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

```

5. **Run the project**

```bash
npm run dev
```

##  Project Structure

```
src/
├─ components/
│  ├─ Home.jsx
│  └─ CanvasEditor.jsx
├─ config/
│  └─ firebase.js
├─ App.jsx
├─ index.js
└─ .env
```

<img width="1919" height="903" alt="image" src="https://github.com/user-attachments/assets/f55eacc9-a714-4f57-ab6c-cc861d9ec316" />
<img width="1910" height="990" alt="image" src="https://github.com/user-attachments/assets/bba6825c-c824-45ef-9b93-9049c8e62945" />
<img width="1919" height="958" alt="image" src="https://github.com/user-attachments/assets/49276287-a6a9-4b5d-a90a-643fdc8c3012" />

---
