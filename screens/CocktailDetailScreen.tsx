import { useEffect, useState } from 'react'
import {useRoute} from '@react-navigation/native'

import { RootTabScreenProps, Cocktail, UserData } from '../types'

import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native'

import { query, where, getDocs, collection } from 'firebase/firestore'
import { db } from '../services/firebase.config'

import { AntDesign } from '@expo/vector-icons'
import GenericAvatar from '../assets/images/genericAvatar.jpg'

export default function CocktailDetailScreen({ navigation }: RootTabScreenProps<'CocktailDetailScreen'>) {

  /* TODO 
    - Set like and add to favorites functionality
    - Set navigate to profile functionality
  */
 
  const route: any = useRoute()
  const { cocktailId, publisherId } = route.params
  
  const [cocktail, setCocktail] = useState<Cocktail | null>(null)
  const [publisher, setPublisher] = useState<UserData | null>(null)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const fetchCocktailData = async (cocktailId: string) => {
    try {
      const q = query(collection(db, 'mixrCocktails'), where('id', '==', cocktailId))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      setCocktail(result[0])      

    } catch (err) {
      console.error(err)
    }
  }

  const fetchPublisherData = async (publisherId: string) => {
    try {
      const q = query(collection(db, 'mixrUsers'), where('id', '==', publisherId)) 
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      setPublisher(result[0])      
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCocktailData(cocktailId)
    fetchPublisherData(publisherId)
  }, [])

  console.log('cocktailId ' + cocktailId)
  console.log('publisherId ' + publisherId)

  console.log('cocktail')
  console.log(cocktail)
  console.log('publisher')
  console.log(publisher)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{ uri: cocktail?.image }} />

        <Text style={styles.title}>{cocktail?.name}</Text>

        <View style={styles.publicationInfoContainer}>
          <View style={styles.publisherInfoContainer}>
            <View>
              <Text style={styles.publishedByText}>Published by:</Text>
              <Text>{publisher?.userName}</Text>
            </View>
            <Image style={styles.profilePicture} source={publisher?.profilePicture ? { uri: publisher?.profilePicture } : GenericAvatar} />
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
          <Text style={styles.contentText}>{cocktail?.description}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Ingredients</Text>
          {cocktail ? 
            cocktail?.ingredients.map((ingredient, i) => <Text key={i} style={styles.contentText}>- {ingredient}</Text>)
            :
            null
          }        
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Recipe</Text>
          {cocktail ?
            cocktail?.recipeSteps.map((step, i) => <Text key={i} style={styles.contentText}>{i+1}) {step}</Text>)
            :
            null
          }
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
