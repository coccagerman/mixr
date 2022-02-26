import { createContext } from 'react'
import {UserData , Cocktail} from '../types'

interface ProfileContext {
    userData: UserData | null,
    favoriteCocktails: Array<Cocktail>,
    publishedRecipes: Array<Cocktail>,
    fetchUserData: (user: any) => Promise<void>,
    fetchFavoriteCocktails: (userData: UserData | null) => Promise<void>,
    fetchPublishedRecipes: (user: any) => Promise<void>,
}

const defaultState = {
    userData: null,
    favoriteCocktails: [],
    publishedRecipes: [],
    fetchUserData: (user: any) => Promise,
    fetchFavoriteCocktails: (userData: UserData | null) => Promise,
    fetchPublishedRecipes: (user: any) => Promise
}

const ProfileContext = createContext<ProfileContext>(defaultState)

export default ProfileContext