import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'

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

import { RootStackParamList, RootTabParamList } from '../types'

import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase.config'

import AuthContextProvider from '../context/AuthContextProvider'

const Navigation: React.FC = () => {

  const Stack = createNativeStackNavigator<RootStackParamList>()
  const Drawer = createDrawerNavigator<RootTabParamList>()

  // const isLoggedIn = false
  const [user] = useAuthState(auth as any)
  const authVar = getAuth()

  const logOut = () => {
    signOut(authVar).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    })
  }

  const CustomDrawerContent = () => { return ( <DrawerItem label="Log out2" onPress={() => logOut()} /> ) }

  const loginStack = () => (
    <Stack.Navigator >
      <Stack.Screen name='LandingScreen' component={LandingScreen} options={{headerShown: false}} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown: false}} />
    </Stack.Navigator>
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
            name="PublicStack"
            component={loginStack}
            options={{headerShown: false}}
          /> )
        :
        (<>
          <Drawer.Screen name='Search cocktails' component={HomeScreen} options={{ header: () => <Header/> }} />
          <Drawer.Screen name='Profile' component={ProfileScreen} options={{ header: () => <Header/> }} />
          <Drawer.Screen name='Publish a recipe' component={PublishRecipeScreen} options={{ header: () => <Header/> }} />
          <Drawer.Screen name='Favorites' component={FavoritesScreen} options={{ header: () => <Header/> }} />
          <Drawer.Screen name='Published recipes' component={PublishedRecipesScreen} options={{ header: () => <Header/> }} />
          <Drawer.Screen name='Log out' component={CustomDrawerContent} options={{ header: () => <Header/> }} />
          
          <Drawer.Screen name='CocktailDetailScreen' component={CocktailDetailScreen} options={{
            header: () => <Header/>,
            drawerLabel: () => null,
            title: undefined
          }} />
        </>
        )}

      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation