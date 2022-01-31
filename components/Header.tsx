import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/native'

import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const Header = () => {

const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text style={styles.title} onPress={() => navigation.navigate('HomeScreen')}>Mixr</Text>
        <View style={styles.iconContainer} >
            <AntDesign name='user' style={styles.icon} size={30} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E51C27',
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 10
  },
  iconContainer: {
    backgroundColor: 'black',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginRight: 10
  },
  icon: {
    padding: 5
  }
})

export default Header