import {createContext} from 'react'

interface AuthContext {
    signInWithGoogle: () => void,
    signInWithFacebook: () => void,
    signInWithTwitter: () => void
}

const defaultState = {
    signInWithGoogle: (): void => {throw new Error('signInWithGoogle function must be overridden')},
    signInWithFacebook: (): void => {throw new Error('signInWithFacebook function must be overridden')},
    signInWithTwitter: (): void => {throw new Error('signInWithTwitter function must be overridden')}
}

const AuthContext = createContext<AuthContext>(defaultState)

export default AuthContext