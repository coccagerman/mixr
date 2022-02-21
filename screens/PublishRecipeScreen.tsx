import { RootTabScreenProps } from '../types'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import { Input } from 'react-native-elements'

export default function PublishRecipeScreen({ navigation }: RootTabScreenProps<'Publish a recipe'>) {

  const [recipeName, setRecipeName] = useState<string>('')
  const [recipeDescription, setRecipeDescription] = useState<string>('')
  const [recipeIngredients, setRecipeIngredients] = useState<string>('')
  const [recipeSteps, setRecipeSteps] = useState<string>('')

  type recipeImageType = { localUri: string } | null
  const [recipeImage, setRecipeImage] = useState<recipeImageType>(null)

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    if (pickerResult.cancelled) return

    setRecipeImage({ localUri: pickerResult.uri })
  }

  const [formHasErrors, setFormHasErrors] = useState<boolean>(false)

  const checkFormErrorsAndSubmit = () => {
    if (!recipeName || !recipeDescription || !recipeIngredients || !recipeSteps || !recipeImage) {
      setFormHasErrors(true)
      console.log('Form has errors.')
    }
    else {
      setFormHasErrors(false)
      console.log('No errors detected, form submited.')
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>Publish a new recipe:</Text>

        <Input
          inputContainerStyle={styles.textInput}
          placeholder='Recipe name ...'
          errorStyle={{ color: 'red' }}
          errorMessage={formHasErrors && !recipeName ? 'Please provide a recipe name' : undefined}
          onChangeText={(text: string) => setRecipeName(text)} 
        />

        <Input
          inputContainerStyle={styles.textInput}
          placeholder='Description ...'
          errorStyle={{ color: 'red' }}
          errorMessage={formHasErrors && !recipeDescription ? 'Please provide a recipe description' : undefined}
          onChangeText={(text: string) => setRecipeDescription(text)}
          multiline = {true}
          numberOfLines = {4} 
        />

        <Input
          inputContainerStyle={styles.textInput}
          placeholder='Ingredients ...'
          errorStyle={{ color: 'red' }}
          errorMessage={formHasErrors && !recipeIngredients ? 'Please provide the recipe ingredients' : undefined}
          onChangeText={(text: string) => setRecipeIngredients(text)}
          multiline = {true}
          numberOfLines = {4}
        />

        <Input
          inputContainerStyle={styles.textInput}
          placeholder='Recipe steps ...'
          errorStyle={{ color: 'red' }}
          errorMessage={formHasErrors && !recipeSteps ? 'Please provide the recipe steps' : undefined}
          onChangeText={(text: string) => setRecipeSteps(text)}
          multiline = {true}
          numberOfLines = {4} 
        />

        { recipeImage ?
          <View style={styles.container}>
            <Image
              source={{ uri: recipeImage.localUri }}
              style={styles.thumbnail}
            />
          </View>
          :
          null
        }

        <TouchableOpacity onPress={openImagePickerAsync} style={[styles.btn, styles.btnSecondary]}>
          <Text style={styles.btnText}>Pick a photo</Text>
        </TouchableOpacity>

        {
          formHasErrors && !recipeImage ?
          <Text style={{ color: 'red' }}>Please provide a photo for the recipe</Text>
          :
          null          
        }

        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary]}
          onPress={() => checkFormErrorsAndSubmit()}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
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
    fontSize: 26,
    marginTop: 20,
    marginBottom: 40,
    fontWeight: 'bold'
  },
  textInput: {
    padding: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btn: {
    width: 200,
    height: 50,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
  },
  btnPrimary: {
    backgroundColor: 'white',
    marginTop: 40
  },
  btnSecondary: {
    backgroundColor: '#DEDEDE',
    marginTop: 20
  },
  btnText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 22
  },
  thumbnail: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 10
  }
})