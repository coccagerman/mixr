
import AuthContext from './AuthContext'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore'
import { db } from '../services/firebase.config'

export default function AuthContextProvider ({ children }: { children: any }) {

  const signInWithGoogle = () => {
    const auth = getAuth() 
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user
        createUserIfDoesntExist(user)
      }).catch(error => {
        console.error(error)
      })
  }

  const signInWithFacebook = () => {
    const auth = getAuth() 
    const provider = new FacebookAuthProvider()

    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user
        createUserIfDoesntExist(user)
      }).catch(error => {
        console.error(error)
      })
  }

  const signInWithTwitter = () => {
    const auth = getAuth() 
    const provider = new TwitterAuthProvider()

    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user
        createUserIfDoesntExist(user)
      }).catch(error => {
        console.error(error)
      })
  }

  const createUserIfDoesntExist = async (user: any) => {
    try {
      // Check if user already exists
      const q = query(collection(db, "mixrUsers"), where("email", "==", user.email))      
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      // If not, create it
      if (result.length === 0) {
        const newUser = {
          email: user.email,
          userName: user.displayName,
          profilePicture: user.photoURL,
          favoriteCocktails: [],
          likedCocktails: [],
          about: "",
          id: user.uid
        }
        const docRef = await addDoc(collection(db, "mixrUsers"), newUser)
      }

    } catch (err) {
      console.error(err)
    }
  }

  return (
      <AuthContext.Provider value={{ signInWithGoogle, signInWithFacebook, signInWithTwitter }} >
          {children}
      </AuthContext.Provider>
  )
}