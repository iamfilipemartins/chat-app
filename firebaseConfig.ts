// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore, collection} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzA2OELrqeHuJQ_Y5UmHboiUa1BQ_RfQI",
  authDomain: "chat-app-ca0.firebaseapp.com",
  projectId: "chat-app-ca0",
  storageBucket: "chat-app-ca0.appspot.com",
  messagingSenderId: "341297957595",
  appId: "1:341297957595:web:8c8ce10118a08ca7e5dafe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,
  {
    persistence: getReactNativePersistence(AsyncStorage)
  }
);

export const db = getFirestore(app);

export const users = collection(db, 'users');
export const chats = collection(db, 'chats');
export const room = collection(db, 'rooms');
