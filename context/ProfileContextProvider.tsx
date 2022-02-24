
import ProfileContext from './ProfileContext'

import { query, where, getDocs, collection, addDoc } from 'firebase/firestore'
import { db } from '../services/firebase.config'

import { Cocktail, UserData } from '../types'
import { useState } from 'react'


export default function ProfileContextProvider ({ children }: { children: any }) {
  

  const [userData, setUserData] = useState<UserData | null>(null)

  const fetchUserData = async (user: any) => {
    try {
      const q = query(collection(db, 'mixrUsers'), where('email', '==', user.email)) 
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      setUserData(result[0])      
    } catch (err) {
      console.error(err)
    }
  }

  const [favoriteCocktails, setFavoriteCocktails] = useState<Array<Cocktail>>([])
  const [publishedRecipes, setPublishedRecipes] = useState<Array<Cocktail>>([])

  const fetchFavoriteCocktails = async (userData: UserData | null) => {
    try {
      const q = query(collection(db, 'mixrCocktails'), where('id', 'in', userData?.favoriteCocktails))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => {result.push(doc.data())} )
      setFavoriteCocktails(result)

    } catch (err) {
      console.error(err)
    }
  }

  const fetchPublishedRecipes = async (user: any) => {
    try {
      const q = query(collection(db, 'mixrCocktails'), where('publisherId', '==', user?.uid))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      setPublishedRecipes(result)      
    } catch (err) {
      console.error(err)
    }
  }


  return (
      <ProfileContext.Provider value={{ userData, fetchUserData, fetchFavoriteCocktails, favoriteCocktails, fetchPublishedRecipes, publishedRecipes }} >
          {children}
      </ProfileContext.Provider>
  )
}