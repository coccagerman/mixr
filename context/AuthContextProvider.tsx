
import AuthContext from './AuthContext'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth'


export default function AuthContextProvider ({ children }: { children: any }) {

    const signInWithGoogle = () => {
        const auth = getAuth() 
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
        .then(result => {
            // The signed-in user info.
            const user = result.user
            console.log(user)
        }).catch(error => {
            // Handle Errors here.
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
    }

    const signInWithFacebook = () => {
        const auth = getAuth() 
        const provider = new FacebookAuthProvider()

        signInWithPopup(auth, provider)
        .then(result => {
            // The signed-in user info.
            const user = result.user
            console.log(user)
        }).catch(error => {
            // Handle Errors here.
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
        })
    }

    const signInWithTwitter = () => {
        const auth = getAuth() 
        const provider = new TwitterAuthProvider()

        signInWithPopup(auth, provider)
            .then(result => {
            // The signed-in user info.
            const user = result.user
            console.log(user)
            }).catch(error => {
            // Handle Errors here.
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        })
    }

    return (
        <AuthContext.Provider value={{ signInWithGoogle, signInWithFacebook, signInWithTwitter }} >
            {children}
        </AuthContext.Provider>
    )
}