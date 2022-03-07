import { createContext } from 'react'
import {UserData } from '../types'

interface ProfileContext {
    fetchUserData: (user: any) => Promise<void>,
    fetchFavoriteCocktails: (userData: UserData | null) => Promise<void>,
    fetchPublishedRecipes: (user: any) => Promise<void>,
}

const defaultState = {
    fetchUserData: async (user: any) => {},
    fetchFavoriteCocktails: async (userData: UserData | null) => {},
    fetchPublishedRecipes: async (user: any) => {}
}

const ProfileContext = createContext<ProfileContext>(defaultState)

export default ProfileContext