import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Cocktail } from '../../../types'

interface Props {
    navigation: any
    cocktail: Cocktail
}

const Searchbar: React.FC<Props> = ({ cocktail, navigation }) => {
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('CocktailDetailScreen', { cocktailId: cocktail.id, publisherId: cocktail.publisherId })}>

        <Image style={styles.image} source={{ uri: cocktail.image }} />

        <Text style={styles.title}>{cocktail.name.length > 14 ? `${cocktail.name.slice(0, 14) + '...'}` : cocktail.name}</Text>
        
        <View style={styles.likesContainer} >
            <AntDesign name='like1' size={20} color='black' />
            <Text style={styles.likesCount}>{cocktail.userLikes ? cocktail.userLikes.length : null}</Text>
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