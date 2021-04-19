import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEz3kQMtZWyp1WIFuBQJBPsSEQvWJkQDo",
  authDomain: "safety-works-316c4.firebaseapp.com",
  projectId: "safety-works-316c4",
  storageBucket: "safety-works-316c4.appspot.com",
  messagingSenderId: "367320313940",
  appId: "1:367320313940:web:d23511f1da49a276c43dc1",
  measurementId: "G-CXWK3X31E1",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export { firebase };
