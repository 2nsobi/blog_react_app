import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDwo5XIRdtBeEW0rH4aHx8CKVmHKZFwDRc",
  authDomain: "blog-tut-app.firebaseapp.com",
  databaseURL: "https://blog-tut-app.firebaseio.com",
  projectId: "blog-tut-app",
  storageBucket: "blog-tut-app.appspot.com",
  messagingSenderId: "21805074969"
}

firebase.initializeApp(config)

export default firebase