import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc  } from "firebase/firestore";


//environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Canvas  Logic 

 const createNewCanvas = async () => {
  try {
    const docRef = await addDoc(collection(db, "canvases"), {
      canvasData: null, 
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (err) {
    console.error("Error creating canvas:", err);
    throw err;
  }
};

//  Load canvas data by ID

 const loadCanvas = async (canvasId) => {
  try {
    const docRef = doc(db, "canvases", canvasId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.canvasData && data.canvasData.objects) return data.canvasData;
    }
    return null;
  } catch (err) {
    console.error("Error loading canvas:", err);
    return null;
  }
};


 //  Save canvas data by ID
 
 const saveCanvas = async (canvasId, canvasJson) => {
  try {
    const cleanJson = JSON.parse(JSON.stringify(canvasJson));
    await updateDoc(doc(db, "canvases", canvasId), {
      canvasData: cleanJson,
      updatedAt: new Date(),
    });
    return true;
  } catch (err) {
    console.error("Error saving canvas:", err);
    return false;
  }
};

export { db, app, loadCanvas, saveCanvas, createNewCanvas };
