import { RootTabScreenProps } from '../types'

import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import MockCocktail from '../assets/images/mockCocktail.jpg'
import GenericAvatar from '../assets/images/genericAvatar.jpg'
import { useState } from 'react'


export default function CocktailDetailScreen({ navigation }: RootTabScreenProps<'CocktailDetailScreen'>) {

  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  interface User {
    userName: string,
    profilePicture: string,
    id: string
  }

  const [user, setUser] = useState<User>(
    {
      userName: 'Facundo Perez',
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
      id: 'CwUqmmjvwdqkPFzeSbV9',
    }
  )

  interface Cocktail {
    name: string,
    image: string,
    description: string,
    ingredients: Array<string>,
    recipeSteps: Array<string>,
    publisherId: string,
    userLikes: Array<string>
  }

  const [cockTail, setCockTail] = useState<Cocktail>(
    {
      name: 'Old fashioned',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
      description: 'A vintage cocktail with a sweet and bitter flavour',
      ingredients: ['Whisky', 'Vermouth', 'Bitter', 'Orange'],
      recipeSteps: ['Pour some whisky.', 'Then add double the ammount of vermouth.', 'A couple slashes of bitter.', 'And just a spring of orange to finish.'],
      publisherId: 'CwUqmmjvwdqkPFzeSbV9',
      userLikes: ['CwUqmmjvwdqkPFzeSbV9']
    }
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={MockCocktail} />

        <Text style={styles.title}>{cockTail.name}</Text>

        <View style={styles.publicationInfoContainer}>
          <View style={styles.publisherInfoContainer}>
            <View>
              <Text style={styles.publishedByText}>Published by:</Text>
              <Text>{user.userName}</Text>
            </View>
            <Image style={styles.profilePicture} source={user.profilePicture ? { uri: user.profilePicture } : GenericAvatar} />
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
          <Text style={styles.contentText}>{cockTail.description}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Ingredients</Text>
          {cockTail.ingredients.map((ingredient, i) => <Text key={i} style={styles.contentText}>- {ingredient}</Text>)}        
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Recipe</Text>
          {cockTail.recipeSteps.map((step, i) => <Text key={i} style={styles.contentText}>- {step}</Text>)}
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
