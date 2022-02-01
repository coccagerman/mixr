import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import LandingScreen from '../screens/LandingScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

import ProfileScreen from '../screens/ProfileScreen'
import CocktailDetailScreen from '../screens/CocktailDetailScreen'
import PublishRecipeScreen from '../screens/PublishRecipeScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import PublishedRecipesScreen from '../screens/PublishedRecipesScreen'

import Header from '../components/Header'
import DrawerNavigator from './DrawerNavigator'

import { RootStackParamList } from '../types'

export default function Navigation() {

  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>

      <Stack.Navigator >
        <Stack.Screen name='LandingScreen' component={LandingScreen} options={{headerShown: false}} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown: false}} />

        <Stack.Screen name='HomeScreen' component={DrawerNavigator} options={{ header: () => <Header/> }} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{ header: () => <Header/> }} />
        <Stack.Screen name='CocktailDetailScreen' component={CocktailDetailScreen} options={{ header: () => <Header/> }} />
        <Stack.Screen name='PublishRecipeScreen' component={PublishRecipeScreen} options={{ header: () => <Header/> }} />

        <Stack.Screen name='FavoritesScreen' component={FavoritesScreen} options={{ header: () => <Header/> }} />
        <Stack.Screen name='PublishedRecipesScreen' component={PublishedRecipesScreen} options={{ header: () => <Header/> }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}