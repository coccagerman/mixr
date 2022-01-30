import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import CocktailDetailScreen from '../screens/CocktailDetailScreen'
import PublishRecipeScreen from '../screens/PublishRecipeScreen'

const DrawerNavigator = () => {

const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator screenOptions={{
        drawerStyle: {
          backgroundColor: 'white'
        },
        drawerPosition: 'right'
      }}>
        <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
        <Drawer.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}} />
        <Drawer.Screen name='CocktailDetail' component={CocktailDetailScreen} options={{headerShown: false}} />
        <Drawer.Screen name='PublishRecipe' component={PublishRecipeScreen} options={{headerShown: false}} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator