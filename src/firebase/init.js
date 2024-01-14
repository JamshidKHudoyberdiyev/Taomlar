// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCpza4B9Iv_uc2qvCK1FxP-p3NYOhNcO_4',
  authDomain: 'ichimliklar-tarkibi.firebaseapp.com',
  databaseURL: 'https://ichimliklar-tarkibi-default-rtdb.firebaseio.com',
  projectId: 'ichimliklar-tarkibi',
  storageBucket: 'ichimliklar-tarkibi.appspot.com',
  messagingSenderId: '733962216220',
  appId: '1:733962216220:web:273ad43ddd2c4000a5d0d9'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db
