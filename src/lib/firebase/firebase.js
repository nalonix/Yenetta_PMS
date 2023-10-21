// Import the functions you need from the SDKs you need
import { getApps, deleteApp, getApp,initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaF7GcimNaA71UBQXDEsQXouAi53pYMWQ",
    authDomain: "yenetta.firebaseapp.com",
    projectId: "yenetta",
    storageBucket: "yenetta.appspot.com",
    messagingSenderId: "981966257274",
    appId: "1:981966257274:web:2414de4a332d512dee8fc3"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
let firebaseApp;
if(!getApps().length){
    firebaseApp = initializeApp(firebaseConfig)
}else{
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)