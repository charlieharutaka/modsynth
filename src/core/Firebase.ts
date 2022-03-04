// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { atom } from 'jotai'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAZjpKGaD4q_h26yzbQIEKx7tx0VpwHg5s',
  authDomain: 'modsynth-78cf5.firebaseapp.com',
  projectId: 'modsynth-78cf5',
  storageBucket: 'modsynth-78cf5.appspot.com',
  messagingSenderId: '441408552580',
  appId: '1:441408552580:web:967fd0067376c1169b4cd1',
  measurementId: 'G-204HW843NY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const appAtom = atom(app)
const analyticsAtom = atom(analytics)

export { appAtom as app, analyticsAtom as analytics }
