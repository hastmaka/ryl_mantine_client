import {initializeApp} from "firebase/app";
import {getAuth, connectAuthEmulator} from 'firebase/auth'
import {connectFirestoreEmulator, initializeFirestore} from 'firebase/firestore';
import {getFunctions, connectFunctionsEmulator } from "firebase/functions";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
	// databaseURL: import.meta.env.VITE_REACT_APP_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {experimentalAutoDetectLongPolling: true}, 'rylllc-nosql-db');
// export const storage = getStorage(app);
export const functions = getFunctions(app);

//work with local emulator
// if (window.location.hostname.includes("localhost")) {
//     connectFirestoreEmulator(db, '127.0.0.1', 8080);
//     connectAuthEmulator(auth, "http://localhost:9099");
//     connectFunctionsEmulator(functions, "localhost", 5001)
// }
