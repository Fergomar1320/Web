import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBi6WlKLtdRi9GS6vjusbwXG2AasyebRA0",
    authDomain: "bamx-cc64f.firebaseapp.com",
    projectId: "bamx-cc64f",
    storageBucket: "bamx-cc64f.appspot.com",
    messagingSenderId: "1043818646012",
    appId: "1:1043818646012:web:c849d93665de5b5f154a79",
    measurementId: "G-310W5CYEM6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;