import { useEffect, useContext } from 'react'

import ProfileContext from '../context/ProfileContext'

import { RootTabScreenProps, Cocktail } from '../types'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase.config'

import { ActivityIndicator, Text, StyleSheet, View } from 'react-native'
import CocktailCard from '../components/home/cocktailCard/CocktailCard'

import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function FavoritesScreen({ navigation }: RootTabScreenProps<'Favorites'>) {

  const { fetchUserData, fetchFavoriteCocktails } = useContext(ProfileContext)

  const userData = useSelector((state: RootState) => state.profile.userData)
  const favoriteCocktails = useSelector((state: RootState) => state.favoriteCocktails.favoriteCocktails)

  const [user] = useAuthState(auth as any)

  useEffect(() => {if(!userData) fetchUserData(user)}, [])
  useEffect(() => {if(userData && !favoriteCocktails) fetchFavoriteCocktails(userData)}, [userData])

  /* TODO:
    - This screen has to work fetching info for any user
  */
  
  return (
    <View style={styles.container}>
      {!favoriteCocktails ? 
        <ActivityIndicator style={styles.loader} size='large' color='#E51C27' />
        :
        <>
      <Text style={styles.title}>Favorite cocktails</Text>
          {favoriteCocktails.length > 0 ?
            <View style={styles.cardsContainer}>
              {favoriteCocktails.map((cocktail: Cocktail) => <CocktailCard key={cocktail.id} cocktail={cocktail} navigation={navigation} />)}
            </View>
            :
            <Text>You don't have any favorite cocktails yet</Text>
          }
        </>
      }
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
  },
  loader: {
    marginTop: 375
  }
})
