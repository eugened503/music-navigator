import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDGX_EdUTVI1v0ks9iiKn_THeGtSvWEVR4',
  authDomain: 'space-navigator.firebaseapp.com',
  projectId: 'space-navigator',
  storageBucket: 'space-navigator.appspot.com',
  messagingSenderId: '665220703315',
  appId: '1:665220703315:web:f675a76e3fe5130a7e12a6'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
