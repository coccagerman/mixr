import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { RootTabScreenProps } from '../types'
import Martini from '../assets/images/martini.png'

export default function LandingScreen({ navigation }: RootTabScreenProps<'LandingScreen'>) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Mixr</Text>

      <Image style={styles.icon} source={Martini} />

      <Text style={styles.text}>Login or create your acount</Text>

      <View style={styles.btnsContainer}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>

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
  icon: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 30
  },
  text: {
    fontSize: 25
  },
  btnsContainer: {
    marginTop: 50,
    flexDirection: 'row'
  },
  btnPrimary: {
    width: 120,
    height: 50,
    margin: 12,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  btnText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 25
  }
})