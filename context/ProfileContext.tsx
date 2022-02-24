import {createContext} from 'react'
import {UserData , Cocktail} from '../types'

interface ProfileContext {
    userData: UserData | null,
    fetchUserData: (user: any) => Promise<void>,
    fetchFavoriteCocktails: (userData: UserData | null) => Promise<void>,
    fetchPublishedRecipes: (user: any) => Promise<void>,
    favoriteCocktails: Array<Cocktail>,
    publishedRecipes: Array<Cocktail>
}

const defaultState = {
    userData: null,
    fetchUserData: (user: any): Promise<void> => {throw new Error('fetchUserData function must be overridden')},
    fetchFavoriteCocktails: (userData: UserData | null): Promise<void> => {throw new Error('fetchFavoriteCocktails function must be overridden')},
    fetchPublishedRecipes: (user: any): Promise<void> => {throw new Error('fetchPublishedRecipes function must be overridden')},
    favoriteCocktails: [],
    publishedRecipes: []
}

const ProfileContext = createContext<ProfileContext>(defaultState)

export default ProfileContext