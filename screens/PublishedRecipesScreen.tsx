import { useState } from 'react'

import { RootTabScreenProps, Cocktail } from '../types'

import { Text, StyleSheet, View } from 'react-native'

import CocktailCard from '../components/home/cocktailCard/CocktailCard'

export default function PublishedRecipesScreen({ navigation }: RootTabScreenProps<'Published recipes'>) {

  const [favoriteCocktails, setFavoriteCocktails] = useState<Array<Cocktail>>([])

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Published recipes</Text>


      <View style={styles.cardsContainer}>
        {favoriteCocktails.map((cocktail, i) => <CocktailCard key={i} cocktail={cocktail} navigation={navigation} />)}
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
