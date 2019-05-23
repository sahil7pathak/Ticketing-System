import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()