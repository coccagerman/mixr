import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import LandingScreen from '../screens/LandingScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

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
        <Stack.Screen name='ProfileScreen' component={DrawerNavigator} options={{ header: () => <Header/> }} />
        <Stack.Screen name='CocktailDetailScreen' component={DrawerNavigator} options={{ header: () => <Header/> }} />
        <Stack.Screen name='PublishRecipeScreen' component={DrawerNavigator} options={{ header: () => <Header/> }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}