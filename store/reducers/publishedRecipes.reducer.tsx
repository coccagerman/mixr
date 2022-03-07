import { Cocktail } from '../../types'
import { SET_PUBLISHED_RECIPES } from '../actions/publishedRecipes.actions'

const INITIAL_STATE = { publishedRecipes: null as any }

const PublishedRecipesReducer = (state = INITIAL_STATE, action: { type: string; payload: Array<Cocktail> }) => {
  switch (action.type) {
    case SET_PUBLISHED_RECIPES: return { publishedRecipes: action.payload }
    default: return state
  }
}

export default PublishedRecipesReducer