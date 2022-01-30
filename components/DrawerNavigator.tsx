import React from 'react'
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import CocktailDetailScreen from '../screens/CocktailDetailScreen'
import PublishRecipeScreen from '../screens/PublishRecipeScreen'

const DrawerNavigator = () => {

const Drawer = createDrawerNavigator()

  return (
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name='HomeScreen' component={HomeScreen} />
            <Drawer.Screen name='ProfileScreen' component={ProfileScreen} />
            <Drawer.Screen name='CocktailDetailScreen' component={CocktailDetailScreen} />
            <Drawer.Screen name='PublishRecipeScreen' component={PublishRecipeScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerNavigator