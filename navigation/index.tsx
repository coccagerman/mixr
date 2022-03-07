import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase.config'

import * as React from 'react'

import LandingScreen from '../screens/LandingScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import CocktailDetailScreen from '../screens/CocktailDetailScreen'
import PublishRecipeScreen from '../screens/PublishRecipeScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import PublishedRecipesScreen from '../screens/PublishedRecipesScreen'

import Header from '../components/Header'

import AuthContextProvider from '../context/AuthContextProvider'

import { RootStackParamList, RootTabParamList } from '../types'

const Navigation: React.FC = () => {

  /* TODO:
    - Style drawer navigator
    - When in cocktail detail screen, no option should be highlighted
    - On landing, register and login screens, drawer shouldn't open
   */

  const Stack = createNativeStackNavigator<RootStackParamList>()
  const Drawer = createDrawerNavigator<RootTabParamList>()

  const [user] = useAuthState(auth as any)

  const loginStack = () => (
    <AuthContextProvider>
      <Stack.Navigator >
        <Stack.Screen name='LandingScreen' component={LandingScreen} options={{headerShown: false}} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </AuthContextProvider>
  )

  return (
    <NavigationContainer>
      <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: 'white' },
        drawerPosition: 'right'
      }}>

        {!user ? (
          <Drawer.Screen
            name='PublicStack'
            component={loginStack}
            options={{headerShown: false}}
            /* options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route)
              if (routeName === 'LandingScreen' || routeName === 'LoginScreen' || routeName === 'RegisterScreen') return ({swipeEnabled: false, gestureEnabled: false})
              else return ({swipeEnabled: true, gestureEnabled: true})
            }}  */
          /> )
        :
          (<>
            <Drawer.Screen name='Search cocktails' component={HomeScreen} options={{ header: () => <Header/> }} />
            <Drawer.Screen name='Profile' component={ProfileScreen} initialParams={{ userParam: null }} options={{ header: () => <Header/> }} />
            <Drawer.Screen name='Publish a recipe' component={PublishRecipeScreen} options={{ header: () => <Header/> }} />
            <Drawer.Screen name='Favorites' component={FavoritesScreen} options={{ header: () => <Header/> }} />
            <Drawer.Screen name='Published recipes' component={PublishedRecipesScreen} options={{ header: () => <Header/> }} />
            <Drawer.Screen name='Log out' component={loginStack} options={{ header: () => <Header/> }} />
            
            <Drawer.Screen name='CocktailDetailScreen' component={CocktailDetailScreen} options={{
              header: () => <Header/>,
              drawerLabel: () => null,
              title: undefined
            }} />
          </>)
        }

      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation