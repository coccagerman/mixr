import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PublishRecipeScreen from '../screens/PublishRecipeScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import PublishedRecipesScreen from '../screens/PublishedRecipesScreen'

const DrawerNavigator = () => {

const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator screenOptions={{
        drawerStyle: {
          backgroundColor: 'white'
        },
        drawerPosition: 'right'
      }}>
        <Drawer.Screen name='Search cocktails' component={HomeScreen} options={{headerShown: false}} />
        <Drawer.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}} />
        <Drawer.Screen name='Publish a recipe' component={PublishRecipeScreen} options={{headerShown: false}} />

        <Drawer.Screen name='Favorites' component={FavoritesScreen} options={{headerShown: false}} />
        <Drawer.Screen name='Published recipes' component={PublishedRecipesScreen} options={{headerShown: false}} />
        <Drawer.Screen name='Log out' component={HomeScreen} options={{headerShown: false}} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator