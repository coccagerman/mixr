import { Cocktail } from '../../types'
import { SET_FAVORITE_COCKTAILS } from '../actions/favoriteCocktails.actions'

const INITIAL_STATE = { favoriteCocktails: null as any  }

const FavoriteCocktailsReducer = (state = INITIAL_STATE, action: { type: string; payload: Array<Cocktail> }) => {
  switch (action.type) {
    case SET_FAVORITE_COCKTAILS: return { favoriteCocktails: action.payload }
    default: return state
  }
}

export default FavoriteCocktailsReducer