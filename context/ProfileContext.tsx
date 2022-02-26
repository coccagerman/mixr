import { createContext } from 'react'
import {UserData , Cocktail} from '../types'

interface ProfileContext {
    userData: UserData | null,
    favoriteCocktails: Array<Cocktail>,
    publishedRecipes: Array<Cocktail>,
    fetchUserData: (user: any) => void,
    fetchFavoriteCocktails: (userData: UserData | null) => void,
    fetchPublishedRecipes: (user: any) => void
}

const defaultState = {
    userData: null,
    favoriteCocktails: [],
    publishedRecipes: [],
    fetchUserData: (user: any): void => {throw new Error('fetchUserData function must be overridden')},
    fetchFavoriteCocktails: (userData: UserData | null): void => {throw new Error('fetchFavoriteCocktails function must be overridden')},
    fetchPublishedRecipes: (user: any): void => {throw new Error('fetchPublishedRecipes function must be overridden')}
}

const ProfileContext = createContext<ProfileContext>(defaultState)

export default ProfileContext