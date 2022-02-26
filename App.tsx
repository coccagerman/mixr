import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import AuthContextProvider from './context/AuthContextProvider'
import ProfileContextProvider from './context/ProfileContextProvider'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <AuthContextProvider>
        <ProfileContextProvider>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ProfileContextProvider>
      </AuthContextProvider>
    )
  }
}
