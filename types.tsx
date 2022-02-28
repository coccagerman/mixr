import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  LandingScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  'Search cocktails': undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  PublicStack: undefined
  Header: undefined
  'Search cocktails': undefined
  Profile: any
  'Publish a recipe': undefined
  Favorites: undefined
  'Published recipes': undefined
  'Log out': undefined
  CocktailDetailScreen: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>
export interface Cocktail {
  id: string,
  name: string,
  image: string,
  description: string,
  ingredients: Array<string>,
  recipeSteps: Array<string>,
  publisherId: string,
  userLikes: Array<string>
}

export interface UserData {
  userName: string,
  profilePicture: string,
  about: string,
  email: string,
  favoriteCocktails: Array<string>,
  likedCocktails: Array<string>,
  id: string
}