import { RootTabScreenProps } from '../types'

import { Text, StyleSheet, View } from 'react-native'

import CocktailCard from '../components/home/cocktailCard/CocktailCard'

export default function FavoritesScreen({ navigation }: RootTabScreenProps<'Favorites'>) {

  const mockCocktails = [1,2,3,4,5,6,7,8,9,10]

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Favorite cocktails</Text>


      <View style={styles.cardsContainer}>
        {mockCocktails.map((cocktail, i) => <CocktailCard key={i} navigation={navigation} />)}
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
