import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
// import { storage } from "/firebase/firebase";
const config = {
  apiKey: "AIzaSyAO5uEM7snr1np2Id2--x_DC2LO4JljbIA",
  authDomain: "makestories-40717.firebaseapp.com",
  databaseURL: "https://makestories-40717.firebaseio.com",
  projectId: "makestories-40717",
  storageBucket: "makestories-40717.appspot.com",
  messagingSenderId: "965160400905",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();
export const fStore = firebase.storage();
export const base = firebase;
