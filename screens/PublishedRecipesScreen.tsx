import { useContext, useEffect } from 'react'

import ProfileContext from '../context/ProfileContext'

import { RootTabScreenProps, Cocktail } from '../types'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase.config'
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native'

import CocktailCard from '../components/home/cocktailCard/CocktailCard'

import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function PublishedRecipesScreen({ navigation }: RootTabScreenProps<'Published recipes'>) {

  const [user] = useAuthState(auth as any)

  const { fetchPublishedRecipes } = useContext(ProfileContext)

  const publishedRecipes = useSelector((state: RootState) => state.publishedRecipes.publishedRecipes)

  useEffect(() => {fetchPublishedRecipes(user)}, [])

  /* TODO:
    - This screen has to work fetching info for any user
  */

  return (
    <View style={styles.container}>
      {!publishedRecipes ? 
        <ActivityIndicator style={styles.loader} size='large' color='#E51C27' />
        :
        <>
          <Text style={styles.title}>Published recipes</Text>
          {publishedRecipes.length > 0 ?
            <View style={styles.cardsContainer}>
              {publishedRecipes.map((cocktail: Cocktail) => <CocktailCard key={cocktail.id} cocktail={cocktail} navigation={navigation} />)}
            </View>
            :
            <Text>You don't have any published recipes yet</Text>
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
