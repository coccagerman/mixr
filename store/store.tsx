
import { createStore, combineReducers } from 'redux'
import FavoriteCocktailsReducer from './reducers/favoriteCocktails.reducer'
import PublishedRecipesReducer from './reducers/publishedRecipes.reducer'
import ProfileReducer from './reducers/profile.reducer'

const RootReducer = combineReducers({
  favoriteCocktails: FavoriteCocktailsReducer,
  publishedRecipes: PublishedRecipesReducer,
  profile: ProfileReducer
})

export default createStore(RootReducer)

export type RootState = ReturnType<typeof RootReducer>