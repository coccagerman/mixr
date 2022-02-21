import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const app = initializeApp({
  apiKey: 'AIzaSyCshkgqRhxzOSzJkZIJ7820_-wHTuxu3EQ',
  authDomain: 'mixr-6e09e.firebaseapp.com',
  projectId: 'mixr-6e09e',
  storageBucket: 'mixr-6e09e.appspot.com',
  messagingSenderId: '561947153492',
  appId: '1:561947153492:web:bcda42e8f17a511a6b49c1'
})


export const auth = getAuth(app)
export default app
