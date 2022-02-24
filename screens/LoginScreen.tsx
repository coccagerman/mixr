import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { RootStackScreenProps } from '../types'

import AuthContext from '../context/AuthContext'
import { useContext } from 'react'

export default function LoginScreen({ navigation }: RootStackScreenProps<'LoginScreen'>) {

  const { signInWithGoogle, signInWithFacebook, signInWithTwitter } = useContext(AuthContext)

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Mixr</Text>

    <Text style={styles.text}>Login</Text>
    
    <TouchableOpacity
      style={styles.btnPrimary}
      onPress={() => signInWithGoogle()}>
      <View style={styles.btnIconContainer}>
        <AntDesign style={styles.btnIcon} name='google' size={24} color='black' />
      </View>
      <Text style={styles.btnText}>Login with Google</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.btnPrimary}
      onPress={() => signInWithFacebook()}>
      <View style={styles.btnIconContainer}>
        <AntDesign style={styles.btnIcon} name='facebook-square' size={24} color='black' />
      </View>
      <Text style={styles.btnText}>Login with Facebook</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.btnPrimary}
      onPress={() => signInWithTwitter()}>
      <View style={styles.btnIconContainer}>
        <AntDesign style={styles.btnIcon} name='twitter' size={24} color='black' />
      </View>
      <Text style={styles.btnText}>Login with Twitter</Text>
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
