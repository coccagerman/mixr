import { useEffect, useContext } from 'react'
import {useRoute} from '@react-navigation/native'

import ProfileContext from '../context/ProfileContext'

import { RootTabScreenProps } from '../types'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase.config'

import { ActivityIndicator, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import CocktailCard from '../components/home/cocktailCard/CocktailCard'
import GenericAvatar from '../assets/images/genericAvatar.jpg'

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {

  const route: any = useRoute()
  const { userParam } = route.params
  
  const [user] = useAuthState(auth as any)

  const {userData, favoriteCocktails, publishedRecipes, fetchUserData, fetchFavoriteCocktails, fetchPublishedRecipes} = useContext(ProfileContext)

  useEffect(() => {
    if (userParam) {
      fetchUserData(userParam)
      fetchPublishedRecipes(userParam)
    } else {
      fetchUserData(user)
      fetchPublishedRecipes(user)
    }
  }, [userParam, publishedRecipes])
  
  useEffect(() => { if (userData) fetchFavoriteCocktails(userData) },[userData, favoriteCocktails])

  /* TODO
    - Add edit option for about section
  */

  return (
    <SafeAreaView style={styles.container}>
      {!userData || !favoriteCocktails || !publishedRecipes ? 
        <ActivityIndicator size='large' color='#E51C27' />
        :
        <ScrollView>

          <View style={styles.profileHeader}>
            <Image style={styles.profilePicture} source={userData?.profilePicture ? { uri: userData.profilePicture } : GenericAvatar}/>
            <Text style={styles.profileName}>{userData?.userName}</Text>
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
                  {favoriteCocktails.length > 4 ?
                    favoriteCocktails.slice(0,4).map(cocktail => <CocktailCard key={cocktail.id} cocktail={cocktail} navigation={navigation} />)
                    :
                    favoriteCocktails.map(cocktail => <CocktailCard key={cocktail.id} cocktail={cocktail} navigation={navigation} />)
                  }

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
                  {publishedRecipes.length > 4 ?
                    publishedRecipes.slice(0,4).map(cocktail => <CocktailCard key={cocktail.id} cocktail={cocktail} navigation={navigation} />)
                    :
                    publishedRecipes.map(cocktail => <CocktailCard key={cocktail.id} cocktail={cocktail} navigation={navigation} />)
                  }

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
