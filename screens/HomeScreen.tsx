import { RootTabScreenProps } from '../types'

import { StyleSheet, View } from 'react-native'

import Searchbar from '../components/home/searchBar/SearchBar'
import CocktailCard from '../components/home/cocktailCard/CocktailCard'

export default function HomeScreen({ navigation }: RootTabScreenProps<'HomeScreen'>) {

  const mockCocktails = [1,2,3,4,5,6,7,8,9,10]

  return (
    <View style={styles.container}>
      <View style={styles.searchbarContainer}>
        <Searchbar />
      </View>

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
