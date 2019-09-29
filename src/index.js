import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './data-store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import './loadAllImages'
import preLoadAllImages from './loadAllImages'
import InitializeFirebase from './config/firebaseConfig'

const initState = {}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

InitializeFirebase()

// Initialize other services on firebase instance
var database = firebase.firestore() // <- needed if using firestore

const storageRef = firebase.storage().ref().child('images')

const store = createStore(
    rootReducer,
    initState,
    applyMiddleware(thunk)
)

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}

preLoadAllImages(database,storageRef).then(()=>{
    console.log('done')
    ReactDOM.render(
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App />
            </ReactReduxFirebaseProvider>
        </Provider>,
        document.getElementById('root'))
})

// store.firebaseAuthIsReady.then(()=>{
//     ReactDOM.render(
//         <Provider store={store}>
//             <ReactReduxFirebaseProvider {...rrfProps}>
//                 <App/>
//             </ReactReduxFirebaseProvider>
//         </Provider>,
// document.getElementById('root'))});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()