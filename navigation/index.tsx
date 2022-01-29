import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import LandingScreen from '../screens/LandingScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import CocktailDetailScreen from '../screens/CocktailDetailScreen'
import PublishRecipeScreen from '../screens/PublishRecipeScreen'
import { RootStackParamList } from '../types'

export default function Navigation() {

  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name='LandingScreen' component={LandingScreen} options={{headerShown: false}} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <Stack.Screen name='CocktailDetailScreen' component={CocktailDetailScreen} />
        <Stack.Screen name='PublishRecipeScreen' component={PublishRecipeScreen} />
      </Stack.Navigator>
  
    </NavigationContainer>
  )
}