
import ProfileContext from './ProfileContext'

import { query, where, getDocs, collection } from 'firebase/firestore'
import { db } from '../services/firebase.config'

import { UserData } from '../types'

import { useDispatch } from 'react-redux'
import { setUserData } from '../store/actions/profile.actions'
import { setPublishedRecipes } from '../store/actions/publishedRecipes.actions'
import { setFavoriteCocktails } from '../store/actions/favoriteCocktails.actions'

export default function ProfileContextProvider ({ children }: { children: any }) {
  
  /* const [userData, setUserData] = useState<UserData | null>(null)
  const [favoriteCocktails, setFavoriteCocktails] = useState<Array<Cocktail> | null>(null)
  const [publishedRecipes, setPublishedRecipes] = useState<Array<Cocktail> | null>(null) */
  const dispatch = useDispatch()

  const fetchUserData = async (user: any) => {
    try {
      const q = query(collection(db, 'mixrUsers'), where('email', '==', user.email)) 
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      dispatch(setUserData(result[0]))

    } catch (err) {
      console.error(err)
    }
  }

  const fetchPublishedRecipes = async (user: any) => {
    try {
      const q = query(collection(db, 'mixrCocktails'), where('publisherId', '==', user.uid ? user.uid : user.id))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      dispatch(setPublishedRecipes(result))

    } catch (err) {
      console.error(err)
    }
  }

  const fetchFavoriteCocktails = async (userData: UserData | null) => {
    try {
      const q = query(collection(db, 'mixrCocktails'), where('id', 'in', userData?.favoriteCocktails))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => {result.push(doc.data())} )
      dispatch(setFavoriteCocktails(result))

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ProfileContext.Provider value={{ fetchUserData, fetchFavoriteCocktails, fetchPublishedRecipes  }} >
      {children}
    </ProfileContext.Provider>
  )
}