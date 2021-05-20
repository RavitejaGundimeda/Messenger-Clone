import firebase from "firebase";

const firebaseApp  = firebase.initializeApp({
    apiKey: "AIzaSyAcf8az7OevX0tXKqDJYvvsVqrx5lVAJPQ",
    authDomain: "facebook-messenger-clone-9c3ef.firebaseapp.com",
    projectId: "facebook-messenger-clone-9c3ef",
    storageBucket: "facebook-messenger-clone-9c3ef.appspot.com",
    messagingSenderId: "315881227750",
    appId: "1:315881227750:web:0593f6b4ea2c5ce6540227",
    measurementId: "G-EPGEW0NCYY"
  });


  const db = firebaseApp.firestore();

  export default db;