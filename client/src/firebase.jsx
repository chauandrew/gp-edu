import firebase from 'firebase'
import "firebase/auth"
import firebaseConfig from "./config/firebase.json";

const db = firebase.initializeApp(firebaseConfig);

export default db;