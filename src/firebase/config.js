import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDjEUpIQxu81JXsrAzUhl7yJd_VMFJ3sk8',
  authDomain: 'money-manager-demo-288cb.firebaseapp.com',
  projectId: 'money-manager-demo-288cb',
  storageBucket: 'money-manager-demo-288cb.appspot.com',
  messagingSenderId: '773875729258',
  appId: '1:773875729258:web:28bbce09cf0161d3d55b13',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
