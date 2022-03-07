import { Cocktail } from '../../types'

export const SET_PUBLISHED_RECIPES = 'SET_PUBLISHED_RECIPES'

export const setPublishedRecipes = (publishedRecipes: Array<Cocktail>) => ({
  type: SET_PUBLISHED_RECIPES,
  payload: publishedRecipes
})