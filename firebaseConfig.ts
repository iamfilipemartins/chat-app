// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore, collection} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa2zJ_vVhzOUAXO4r4MC3v_FKvZSjacUw",
  authDomain: "chat-app-ca00.firebaseapp.com",
  projectId: "chat-app-ca00",
  storageBucket: "chat-app-ca00.appspot.com",
  messagingSenderId: "542338376287",
  appId: "1:542338376287:web:7572e4a975a24334e131ea"
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
export const chat = collection(db, 'chat');
