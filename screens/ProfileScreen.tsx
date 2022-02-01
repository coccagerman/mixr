import { RootTabScreenProps } from '../types'

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import CocktailCard from '../components/home/cocktailCard/CocktailCard'

import MockProfilePicture from '../assets/images/mockProfilePicture.jpg'

export default function ProfileScreen({ navigation }: RootTabScreenProps<'ProfileScreen'>) {

  const mockCocktails = [1,2,3,4]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

          <View style={styles.profileHeader}>
            <Image style={styles.profilePicture} source={MockProfilePicture} />
            <Text style={styles.profileName}>John Hopkins</Text>
          </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>About me</Text>
          <Text style={styles.contentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus metus ut nisi dictum malesuada. Sed a viverra nibh. Cras posuere luctus nisl at auctor. Mauris a vulputate sapien. Vivamus sed sem odio. Suspendisse hendrerit sollicitudin justo, non dictum nisi consequat non.</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Favorites</Text>

          <View style={styles.cardsContainer}>
            {mockCocktails.map((cocktail, i) => <CocktailCard key={i} navigation={navigation} />)}
          </View>

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('FavoritesScreen')}>
            <Text style={styles.btnText}>See all favorites</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Published recipes</Text>

          <View style={styles.cardsContainer}>
            {mockCocktails.map((cocktail, i) => <CocktailCard key={i} navigation={navigation} />)}
          </View>

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('PublishedRecipesScreen')}>
            <Text style={styles.btnText}>See all recipes</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
  },
  profileName: {
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 5
  },
  contentSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  contentText: {
    fontSize: 20
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnPrimary: {
    width: 175,
    height: 35,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEDEDE',
    padding: 5,
    borderRadius: 5,
  },
  btnText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '600'
  }
})
