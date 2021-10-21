import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBBaSoa320PTw2VL7DCyGzevl1g0FUdp1o",
  authDomain: "disneyplus-clone-7cbf8.firebaseapp.com",
  projectId: "disneyplus-clone-7cbf8",
  storageBucket: "disneyplus-clone-7cbf8.appspot.com",
  messagingSenderId: "291758086976",
  appId: "1:291758086976:web:cfc8ee0fcd8936c51df8a5",
  measurementId: "G-6ZPZ9L045Q",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
