import { useEffect, useContext } from 'react'

import ProfileContext from '../context/ProfileContext'

import { RootTabScreenProps } from '../types'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase.config'

import { Text, StyleSheet, View } from 'react-native'
import CocktailCard from '../components/home/cocktailCard/CocktailCard'

export default function FavoritesScreen({ navigation }: RootTabScreenProps<'Favorites'>) {

  const {userData, favoriteCocktails, fetchUserData, fetchFavoriteCocktails} = useContext(ProfileContext)

  const [user] = useAuthState(auth as any)

  useEffect(() => {if(!userData) fetchUserData(user)}, [])
  useEffect(() => {if(userData && !favoriteCocktails) fetchFavoriteCocktails(userData)}, [userData])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite cocktails</Text>

      <View style={styles.cardsContainer}>
        {favoriteCocktails.map(cocktail => <CocktailCard key={cocktail.id} cocktail={cocktail} navigation={navigation} />)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
