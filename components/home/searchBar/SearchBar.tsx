import { useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar'

// Using SearchBarBaseProps instead of SearchBarDefaultProps & SearchBarAndroidProps & SearchBarIOSProps
const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>

import { StyleSheet, View } from 'react-native'

const Searchbar: React.FC = () => {

const [search, setSearch] = useState<string>('')

const updateSearch = (search: string) => setSearch(search)
  
  return (
    <View style={styles.container}>
        <SafeSearchBar
            platform='default'
            placeholder='Cocktail name or ingredient ...'
            onChangeText={(text: string) => updateSearch(text)}
            value={search}
            containerStyle={styles.searchBar}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
      width: 350
  }
})

export default Searchbar