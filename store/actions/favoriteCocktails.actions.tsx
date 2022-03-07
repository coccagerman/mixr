import { Cocktail } from '../../types'

export const SET_FAVORITE_COCKTAILS = 'SET_FAVORITE_COCKTAILS'

export const setFavoriteCocktails = (favoriteCocktails: Array<Cocktail>) => ({
  type: SET_FAVORITE_COCKTAILS,
  payload: favoriteCocktails
})