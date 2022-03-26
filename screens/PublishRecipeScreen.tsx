import { RootTabScreenProps } from '../types'
import { useState, useRef } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase.config'
import { useAuthState } from 'react-firebase-hooks/auth'

import { TextInput } from 'react-native'
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import { Input } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons'

export default function PublishRecipeScreen({ navigation }: RootTabScreenProps<'Publish a recipe'>) {
  
  const [user] = useAuthState(auth as any)

  const [recipeName, setRecipeName] = useState<string>('')
  const [recipeDescription, setRecipeDescription] = useState<string>('')
  const [ingredient, setIngredient] = useState<string>('')
  const [recipeIngredients, setRecipeIngredients] = useState<Array<string>>([])
  const [step, setStep] = useState<string>('')
  const [recipeSteps, setRecipeSteps] = useState<Array<string>>([])
  
  const [formHasErrors, setFormHasErrors] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)

  type recipeImageType = { localUri: string } | null
  const [recipeImage, setRecipeImage] = useState<recipeImageType>(null)

  const nameInput = useRef<null | TextInput>(null)
  const descriptionInput = useRef<null | TextInput>(null)
  const ingredientInput = useRef<null | TextInput>(null)
  const stepInput = useRef<null | TextInput>(null)

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

  const checkFormErrorsAndSubmit = () => {
    if (!recipeName || !recipeDescription || !recipeIngredients || !recipeSteps || !recipeImage) setFormHasErrors(true)
    else {
      setFormHasErrors(false)
      try {
        setShowLoader(true)
        addDoc(collection(db, 'mixrCocktails'), {
          name: recipeName,
          description: recipeDescription,
          ingredients: recipeIngredients,
          image: recipeImage.localUri,
          recipeSteps,
          userLikes: [],
          publisherId: user?.uid,
          id: new Date().valueOf()
        }).then(() => {
            setRecipeName('')
            nameInput.current?.clear()
            setRecipeDescription('')
            descriptionInput.current?.clear()
            setIngredient('')
            ingredientInput.current?.clear()
            setRecipeIngredients([])
            stepInput.current?.clear()
            setStep('')
            setRecipeSteps([])
            setFormHasErrors(false)
            setRecipeImage(null)
            setShowLoader(false)
            navigation.navigate('Profile')
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <SafeAreaView style={styles.preContainer}>
      {showLoader ? 
        <ActivityIndicator style={styles.loader} size='large' color='#E51C27' />
      :
        <ScrollView contentContainerStyle={styles.container}>

          <Text style={styles.title}>Publish a new recipe:</Text>

          <Text style={styles.subtitle}>Name:</Text>
          <Input
            inputContainerStyle={styles.textInput}
            placeholder='Recipe name ...'
            errorStyle={{ color: 'red' }}
            errorMessage={formHasErrors && !recipeName ? 'Please provide a recipe name' : undefined}
            onChangeText={(text: string) => setRecipeName(text)}
            ref={nameInput}
          />

          <Text style={styles.subtitle}>Description:</Text>
          <Input
            inputContainerStyle={styles.textInput}
            placeholder='Description ...'
            errorStyle={{ color: 'red' }}
            errorMessage={formHasErrors && !recipeDescription ? 'Please provide a recipe description' : undefined}
            onChangeText={(text: string) => setRecipeDescription(text)}
            multiline = {true}
            numberOfLines = {4}
            ref={descriptionInput}
          />

          <Text style={styles.subtitle}>Ingredients:</Text>
          {recipeIngredients ? 
            <View style={styles.ingredientsContainer}>
              {recipeIngredients.map((item, i) => <Text key={i} style={styles.ingredients}>{item}</Text>)}
            </View>
          :
            null
          }
          
          <View style={styles.textInputContainer}>
            <Input
              inputContainerStyle={styles.textInput}
              placeholder='Ingredient ...'
              errorStyle={{ color: 'red' }}
              errorMessage={formHasErrors && !recipeIngredients ? 'Please provide the recipe ingredients' : undefined}
              onChangeText={(text: string) => setIngredient(text)}
              ref={ingredientInput}
            />

            <TouchableOpacity onPress={() => {
              if (ingredient) {
                setRecipeIngredients([... recipeIngredients, ingredient])
                ingredientInput.current?.clear()
                setIngredient('')
              }
            }}>
              <Ionicons name='add-circle' size={34} color='black' style={styles.addIcon}/>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.subtitle}>Recipe:</Text>
          {recipeSteps ?
            <View>
              {recipeSteps.map((item, i) => <Text key={i} style={styles.steps}>{i+1}- {item}</Text>)}
            </View>
          :
            null
          }

          <View style={styles.textInputContainer}>
            <Input
              inputContainerStyle={styles.textInput}
              placeholder='Recipe step ...'
              errorStyle={{ color: 'red' }}
              errorMessage={formHasErrors && !recipeSteps ? 'Please provide the recipe steps' : undefined}
              onChangeText={(text: string) => setStep(text)}
              ref={stepInput}
            />

            <TouchableOpacity onPress={() => {
              if (step) {
                setRecipeSteps([... recipeSteps, step])
                stepInput.current?.clear()
                setStep('')
              }
            }}>
              <Ionicons name='add-circle' size={34} color='black' />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: recipeImage?.localUri }}
              style={styles.thumbnail}
            />
          </View>

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
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  preContainer: {
    flex:1,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    marginTop: 20,
    marginBottom: 40,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold'
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addIcon: {
    marginBottom: 10
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
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom: 50,
  },
  thumbnail: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 50
  },
  ingredientsContainer: {
    flexWrap:'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ingredients: {
    backgroundColor: '#DEDEDE',
    borderRadius: 5,
    padding: 5,
    margin: 5
  },
  steps: {
    backgroundColor: '#DEDEDE',
    borderRadius: 5,
    padding: 5,
    margin: 5
  },
  loader: {
    marginTop: 375
  }
})
