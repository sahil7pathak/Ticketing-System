import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBGyGAmg9XC-PxyRz445TDf8ZIFd-NJUeM",
    authDomain: "ticketing-system-89239.firebaseapp.com",
    databaseURL: "https://ticketing-system-89239.firebaseio.com",
    projectId: "ticketing-system-89239",
    storageBucket: "ticketing-system-89239.appspot.com",
    messagingSenderId: "241144479899"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()