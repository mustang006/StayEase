import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkI-qnGJVSvIxKTGIZx3oOJ0fSyETLVoY",
  authDomain: "stayeaseauth.firebaseapp.com",
  projectId: "stayeaseauth",
  storageBucket: "stayeaseauth.appspot.com",
  messagingSenderId: "166841977601",
  appId: "1:166841977601:web:911d8afea56fe50835a900"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Firestore export
