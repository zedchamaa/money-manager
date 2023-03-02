import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCYkpfyNS7tpdbT2wAxQkcVZPB0oapzE2g',
  authDomain: 'money-manager-demo-79ec4.firebaseapp.com',
  projectId: 'money-manager-demo-79ec4',
  storageBucket: 'money-manager-demo-79ec4.appspot.com',
  messagingSenderId: '666624481732',
  appId: '1:666624481732:web:2036b155c65d5e65d9ac91',
}

// init firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
