import 'react-native-gesture-handler'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import ProfileContextProvider from './context/ProfileContextProvider'

import { Provider } from 'react-redux'
import store from './store/store'

export default function App() {

  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <ProfileContextProvider>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ProfileContextProvider>
      </Provider>
    )
  }
}
