import { useEffect, useState } from 'react'

import { RootTabScreenProps, Cocktail, UserData } from '../types'

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import CocktailCard from '../components/home/cocktailCard/CocktailCard'

import GenericAvatar from '../assets/images/genericAvatar.jpg'

import { query, where, getDocs, collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../services/firebase.config'

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {
  /* TODO - MOVE THIS TO A PROFILE CONTEXT */
  const [user] = useAuthState(auth as any)

  const [userData, setUserData] = useState<UserData | null>(null)

  const fetchUserData = async (user: any) => {
    try {
      const q = query(collection(db, 'mixrUsers'), where('email', '==', user.email)) 
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      setUserData(result[0])      
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {fetchUserData(user)}, [])

  const [favoriteCocktails, setFavoriteCocktails] = useState<Array<Cocktail>>([])
  const [publishedRecipes, setPublishedRecipes] = useState<Array<Cocktail>>([])

  const fetchFavoriteCocktails = async (userData: UserData | null) => {
    try {
      const q = query(collection(db, 'mixrCocktails'), where('id', 'in', userData?.favoriteCocktails))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => {result.push(doc.data())} )
      setFavoriteCocktails(result)

    } catch (err) {
      console.error(err)
    }
  }

  const fetchPublishedRecipes = async (user: any) => {
    try {
      const q = query(collection(db, 'mixrCocktails'), where('publisherId', '==', user?.uid))   
      const querySnapshot = await getDocs(q)
      const result: any[] = []
      querySnapshot.forEach(doc => result.push(doc.data()) )
      setPublishedRecipes(result)      
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userData) {
      fetchFavoriteCocktails(userData)
      fetchPublishedRecipes(user)
    }
  }, [userData])
  /* ====================================== */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

          <View style={styles.profileHeader}>
            <Image style={styles.profilePicture} source={user ? { uri: user?.photoURL } : GenericAvatar}/>
            <Text style={styles.profileName}>{user?.displayName}</Text>
          </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>About me</Text>
          <Text style={styles.contentText}>{userData ? userData.about : "The user hasn't completed this section yet."}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Favorites</Text>

          <View style={styles.cardsContainer}>
            {favoriteCocktails.length > 0 ?
              <>
                {favoriteCocktails.map((cocktail, i) => <CocktailCard key={i} cocktail={cocktail} navigation={navigation} />)}

                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={() => navigation.navigate('Favorites')}>
                  <Text style={styles.btnText}>See all favorites</Text>
                </TouchableOpacity>
              </>
              :
              <Text>The user doesn't have any favorite recipes yet.</Text>
            }
          </View>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>Published recipes</Text>

          <View style={styles.cardsContainer}>
            {publishedRecipes.length > 0 ?
              <>
                {publishedRecipes.map((cocktail, i) => <CocktailCard key={i} cocktail={cocktail} navigation={navigation} />)}

                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={() => navigation.navigate('Published recipes')}>
                  <Text style={styles.btnText}>See all recipes</Text>
                </TouchableOpacity>
              </>
              :
              <Text>The user doesn't have any published recipes yet.</Text>
            }
          </View>
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
    borderRadius: 100/2
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
    borderRadius: 5
  },
  btnText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '600'
  }
})
