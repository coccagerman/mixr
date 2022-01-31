import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import MockCocktail from '../../../assets/images/mockCocktail.jpg'

interface Props {
    navigation: any
}

const Searchbar: React.FC<Props> = ({ navigation }) => {
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('CocktailDetailScreen')}>

        <Image style={styles.image} source={MockCocktail} />

        <Text style={styles.title}>Old fashioned</Text>
        
        <View style={styles.likesContainer} >
            <AntDesign name='like1' size={20} color='black' />
            <Text style={styles.likesCount}>100</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    backgroundColor: '#DEDEDE',
    height: 220,
    width: 160,
    borderRadius: 5
  },
  image: {
      height: 150,
      width: 150,
      borderRadius: 5
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  likesCount: {
    fontSize: 16,
    marginLeft: 5
  }
})

export default Searchbar