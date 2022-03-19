// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBaEmrUzXNMNPv7khL5ybs18_XE1PhfsW8",
  authDomain: "ritco-app.firebaseapp.com",
  databaseURL: "https://ritco-app-default-rtdb.firebaseio.com",
  projectId: "ritco-app",
  storageBucket: "ritco-app.appspot.com",
  messagingSenderId: "341782083749",
  appId: "1:341782083749:web:4ec032f14865f96e7a754c",
  measurementId: "G-DDKXF5ZPMS",
});
export const auth = app.auth();
export const projectStorage = firebase.storage();
export default app;
