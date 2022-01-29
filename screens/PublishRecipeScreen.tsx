import { StyleSheet, Text, View, Button } from 'react-native'

import { RootTabScreenProps } from '../types'

export default function PublishRecipeScreen({ navigation }: RootTabScreenProps<'PublishRecipeScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PublishRecipeScreen</Text>
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
