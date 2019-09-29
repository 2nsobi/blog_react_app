import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const InitializeFirebase = () =>{
  // Initialize Firebase
  var fbconfig = {
    apiKey: "AIzaSyDwo5XIRdtBeEW0rH4aHx8CKVmHKZFwDRc",
    authDomain: "blog-tut-app.firebaseapp.com",
    databaseURL: "https://blog-tut-app.firebaseio.com",
    projectId: "blog-tut-app",
    storageBucket: "blog-tut-app.appspot.com",
    messagingSenderId: "21805074969"
  }

  firebase.initializeApp(fbconfig)
}


export default InitializeFirebase