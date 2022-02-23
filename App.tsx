import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import AuthContextProvider from './context/AuthContextProvider'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <AuthContextProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </AuthContextProvider>
    )
  }
}
