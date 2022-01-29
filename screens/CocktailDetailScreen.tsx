import { StyleSheet, Text, View, Button } from 'react-native'

import { RootTabScreenProps } from '../types'

export default function CocktailDetailScreen({ navigation }: RootTabScreenProps<'CocktailDetailScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CocktailDetailScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
