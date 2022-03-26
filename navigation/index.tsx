import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase.config'

import AuthContextProvider from '../context/AuthContextProvider'

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

import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons'

import { RootStackParamList, RootTabParamList } from '../types'

const Navigation: React.FC = () => {

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
        drawerStyle: { backgroundColor: 'white', paddingTop: 40 },
        drawerLabelStyle: { fontSize: 18, marginLeft: -20 },
        drawerActiveBackgroundColor: '#FF7F7F',
        drawerActiveTintColor: 'black',
        drawerPosition: 'right'
      }}>

        {!user ? (
          <Drawer.Screen
            name='PublicStack'
            component={loginStack}
            options={{headerShown: false}}
          /> )
        :
          (<>
            <Drawer.Screen name='Search cocktails' component={HomeScreen} options={{ 
                header: () => <Header/>,
                drawerIcon: () => <AntDesign name='search1' size={24} color='black' /> 
            }} />
            <Drawer.Screen name='Profile' component={ProfileScreen} initialParams={{ userParam: null }} options={{
              header: () => <Header/>,
              drawerIcon: () => <AntDesign name='user' size={24} color='black' /> 
            }} />
            <Drawer.Screen name='Publish a recipe' component={PublishRecipeScreen} options={{
              header: () => <Header/>,
              drawerIcon: () => <Fontisto name='cocktail' size={24} color='black' />
            }} />
            <Drawer.Screen name='Favorites' component={FavoritesScreen} options={{
              header: () => <Header/>,
              drawerIcon: () => <MaterialIcons name='favorite' size={24} color='black' />
            }} />
            <Drawer.Screen name='Published recipes' component={PublishedRecipesScreen} options={{
              header: () => <Header/>,
              drawerIcon: () => <AntDesign name='profile' size={24} color='black' />
            }} />
            <Drawer.Screen name='Log out' component={loginStack}  options={{
              header: () => <Header/>,
              drawerIcon: () => <AntDesign name='logout' size={24} color='black' />
            }} />
            
            <Drawer.Screen name='CocktailDetailScreen' component={CocktailDetailScreen} options={{
              header: () => <Header/>,
              drawerLabel: () => null,
              title: undefined,
              drawerActiveBackgroundColor: 'transparent'
            }} />
          </>)
        }

      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation