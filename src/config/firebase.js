import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD89OrzkHE-7Z2iQXZISR9m8zUkHGL65kY",
    authDomain: "tibia-char.firebaseapp.com",
    projectId: "tibia-char",
    storageBucket: "tibia-char.appspot.com",
    messagingSenderId: "282497793124",
    appId: "1:282497793124:web:476841e9a114b268d8f371"
  };

  export default firebase.initializeApp(firebaseConfig);