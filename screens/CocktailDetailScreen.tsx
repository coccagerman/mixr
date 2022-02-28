import { useEffect, useState } from 'react'
import {useRoute} from '@react-navigation/native'

import { RootTabScreenProps, Cocktail, UserData } from '../types'

import { ActivityIndicator, StyleSheet, TouchableOpacity, Text, View, Image, SafeAreaView, ScrollView } from 'react-native'

import { query, where, getDocs, collection, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../services/firebase.config'

import { AntDesign } from '@expo/vector-icons'
import GenericAvatar from '../assets/images/genericAvatar.jpg'

export default function CocktailDetailScreen({ navigation }: RootTabScreenProps<'CocktailDetailScreen'>) {

  /* TODO 
    - Set like and add to favorites functionality
W  */
 
  const route: any = useRoute()
  const { cocktailId, publisherId } = route.params
  
  const [cocktail, setCocktail] = useState<Cocktail | null>(null)
  const [publisher, setPublisher] = useState<UserData | null>(null)
  const [isLiked, setIsLiked] = useState<boolean | null>(null)
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null)

  const fetchCocktailData = async (cocktailId: string) => {
    try {
      const q = query(collection(db, 'mixrCocktails'), where('id', '==', cocktailId))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      setCocktail(result[0])

      setIsLiked(result[0].userLikes.indexOf(publisherId) !== -1)
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

      setIsFavorite(result[0].favoriteCocktails.indexOf(cocktailId) !== -1)
    } catch (err) {
      console.error(err)
    }
  }

  const toggleLike = async () => {
    try {
      const docRef = doc(db, 'mixrCocktails', cocktailId)
      /* const q = query(collection(db, 'mixrCocktails'), where('id', '==', cocktailId))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) ) */

      if (!isLiked) {
        await updateDoc(docRef, { userLikes: arrayUnion(publisherId) })
        setIsLiked(true)
      } else {
        await updateDoc(docRef, { userLikes: arrayRemove(publisherId) })
        setIsLiked(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const toggleFavorite = async () => {
    try {
      const docRef = doc(db, 'mixrUsers', publisherId)
      /* const q = query(collection(db, 'mixrCocktails'), where('id', '==', cocktailId))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) ) */

      if (!isFavorite) {
        await updateDoc(docRef, { favoriteCocktails: arrayUnion(cocktailId) })
        setIsFavorite(true)
      } else {
        await updateDoc(docRef, { favoriteCocktails: arrayRemove(cocktailId) })
        setIsFavorite(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCocktailData(cocktailId)
    fetchPublisherData(publisherId)
  }, [cocktailId, publisherId])

  return (
    <SafeAreaView style={styles.container}>
      {!cocktail || !publisher ? 
        <ActivityIndicator size='large' color='#E51C27' />
        :
        <ScrollView>
          <Image style={styles.image} source={{ uri: cocktail?.image }} />

          <Text style={styles.title}>{cocktail?.name}</Text>

          <View style={styles.publicationInfoContainer}>
            <TouchableOpacity style={styles.publisherInfoContainer} onPress={() => navigation.navigate('Profile', { userParam: publisher })}>
              <View>
                  <Text style={styles.publishedByText}>Published by:</Text>
                  <Text>{publisher?.userName}</Text>
              </View>
              <Image style={styles.profilePicture} source={publisher?.profilePicture ? { uri: publisher?.profilePicture } : GenericAvatar} />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
              <View style={styles.likesContainer} >
                <AntDesign name={isLiked ? 'like1' : 'like2'} size={28} color='black' onPress={() => toggleLike()} />
                <Text style={styles.likesCount}>{cocktail?.userLikes.length}</Text>
              </View>

              <AntDesign style={styles.heartIcon} name={isFavorite ? 'heart' : 'hearto'} size={28} color='black' onPress={() => toggleFavorite()} />
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
      }
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
