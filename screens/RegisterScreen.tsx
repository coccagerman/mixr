import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from '../types'
import { AntDesign } from '@expo/vector-icons'

import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth"

export default function RegisterScreen({ navigation }: RootStackScreenProps<'RegisterScreen'>) {


  const signInWithGoogle = () => {
    const auth = getAuth() 
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(result => {
        // The signed-in user info.
        const user = result.user
        console.log(user)
      }).catch(error => {
        // Handle Errors here.
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      })
  }

  const signInWithFacebook = () => {
    const auth = getAuth() 
    const provider = new FacebookAuthProvider()

    signInWithPopup(auth, provider)
      .then(result => {
        // The signed-in user info.
        const user = result.user
        console.log(user)
      }).catch(error => {
        // Handle Errors here.
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      })
  }

  const signInWithTwitter = () => {
    const auth = getAuth() 
    const provider = new TwitterAuthProvider()

    signInWithPopup(auth, provider)
      .then(result => {
        // The signed-in user info.
        const user = result.user
        console.log(user)
      }).catch(error => {
        // Handle Errors here.
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mixr</Text>

      <Text style={styles.text}>Create your account</Text>
      
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => signInWithGoogle()}>
        <View style={styles.btnIconContainer}>
          <AntDesign style={styles.btnIcon} name='google' size={24} color='black' />
        </View>
        <Text style={styles.btnText}>Register with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => signInWithFacebook()}>
        <View style={styles.btnIconContainer}>
          <AntDesign style={styles.btnIcon} name='facebook-square' size={24} color='black' />
        </View>
        <Text style={styles.btnText}>Register with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => signInWithTwitter()}>
        <View style={styles.btnIconContainer}>
          <AntDesign style={styles.btnIcon} name='twitter' size={24} color='black' />
        </View>
        <Text style={styles.btnText}>Register with Twitter</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E51C27'
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 25
  },
  btnPrimary: {
    width: 300,
    height: 50,
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  btnIconContainer: {
    marginLeft: 8,
    width: 35
  },
  btnIcon: {
    marginRight: 10
  },
  btnText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 22
  }
})
