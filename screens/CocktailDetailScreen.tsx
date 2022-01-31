import { RootTabScreenProps } from '../types'

import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import MockCocktail from '../assets/images/mockCocktail.jpg'
import MockProfilePicture from '../assets/images/mockProfilePicture.jpg'
import { useState } from 'react'


export default function CocktailDetailScreen({ navigation }: RootTabScreenProps<'CocktailDetailScreen'>) {

  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={MockCocktail} />

        <Text style={styles.title}>Old fashioned</Text>

        <View style={styles.publicationInfoContainer}>
          <View style={styles.publisherInfoContainer}>
            <View>
              <Text style={styles.publishedByText}>Published by:</Text>
              <Text>John Hopkins</Text>
            </View>
            <Image style={styles.profilePicture} source={MockProfilePicture} />
          </View>

          <View style={styles.iconsContainer}>
            <View style={styles.likesContainer} >
                <AntDesign name={isLiked ? 'like1' : 'like2'} size={28} color='black' onPress={() => setIsLiked(!isLiked)} />
                <Text style={styles.likesCount}>{isLiked ? '101' : '100'}</Text>
            </View>

            <AntDesign style={styles.heartIcon} name={isFavorite ? 'heart' : 'hearto'} size={28} color='black' onPress={() => setIsFavorite(!isFavorite)} />
          </View>

        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.contentText}>The old fashioned is a fine cocktail to sip on a autumn evening. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus metus ut nisi dictum malesuada. Sed a viverra nibh. Cras posuere luctus nisl at auctor. Mauris a vulputate sapien. Vivamus sed sem odio. Suspendisse hendrerit sollicitudin justo, non dictum nisi consequat non.</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Ingredients</Text>
          <Text style={styles.contentText}>- Whisky</Text>
          <Text style={styles.contentText}>- Vermouth</Text>
          <Text style={styles.contentText}>- Bitter</Text>
          <Text style={styles.contentText}>- Orange</Text>          
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Recipe</Text>
          <Text style={styles.contentText}>1- Suspendisse bibendum libero non tincidunt venenatis.</Text>
          <Text style={styles.contentText}>2- Suspendisse bibendum libero non tincidunt venenatis.</Text>
          <Text style={styles.contentText}>3- Suspendisse bibendum libero non tincidunt venenatis.</Text>
          <Text style={styles.contentText}>4- Suspendisse bibendum libero non tincidunt venenatis.</Text>
          <Text style={styles.contentText}>5- Suspendisse bibendum libero non tincidunt venenatis.</Text>
          <Text style={styles.contentText}>6- Suspendisse bibendum libero non tincidunt venenatis.</Text>
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
  image: {
    width: 300,
    height: 300,
    marginTop: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignSelf: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: 'center'
  },
  publicationInfoContainer: {
    backgroundColor: '#DEDEDE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 10
  },
  publisherInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  publishedByText: {
    fontWeight: '600'
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    marginLeft: 5
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  likesCount: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 3
  },
  heartIcon: {
    marginLeft: 25
  },
  contentSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  contentText: {
    fontSize: 20
  }
})
