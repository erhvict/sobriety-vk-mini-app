import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAGFPjSlp-QjJCamgfJc-x3T27_IQIpSPY',
  authDomain: 'alcoblock-22b15.firebaseapp.com',
  databaseURL: 'https://alcoblock-22b15-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'alcoblock-22b15',
  storageBucket: 'alcoblock-22b15.appspot.com',
  messagingSenderId: '421894008292',
  appId: '1:421894008292:web:f440aa4dcb03239f426bf1',
  measurementId: 'G-0CGDDF0WF3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
