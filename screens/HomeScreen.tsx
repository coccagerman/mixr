import { useEffect, useState } from 'react'

import { RootTabScreenProps, Cocktail } from '../types'

import { StyleSheet, View } from 'react-native'

import Searchbar from '../components/home/searchBar/SearchBar'
import CocktailCard from '../components/home/cocktailCard/CocktailCard'

import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase.config'

export default function HomeScreen({ navigation }: RootTabScreenProps<'Search cocktails'>) {
  
  const [cockTails, setCockTails] = useState<Array<Cocktail>>([])

  const fetchCocktails = async () => {
    try {
      const q = query(collection(db, 'mixrCocktails'))
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      setCockTails(result)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchCocktails() }, [])

  /* TODO - Should refetch content each time the page is rendered */
  /* TODO - Infinite scroll? */

  return (
    <View style={styles.container}>
      <View style={styles.searchbarContainer}>
        <Searchbar />
      </View>

      <View style={styles.cardsContainer}>
        {cockTails.map(cocktail => <CocktailCard key={cocktail.id} cocktail={cocktail} navigation={navigation} />)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchbarContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
