import { db } from "configs/firebase.config"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import googleIcon from 'assets/svg/googleIcon.svg'
import { toast } from "react-toastify"

const OAuth = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()

    const onGoogleClick = async () => {

        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            const docRef = await doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
            toast.success('You have logged in!')
        } catch (error) {
            toast.error('Could not authorize with Google!')
        }
    }

    return (
        <div className="socialLogin">
            <p>Sign {location.pathname === '/sign-up' ? "Up" : 'In'} with</p>
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img className="socialIconImg" src={googleIcon} alt="google" />
            </button>

        </div>
    )
}

export default OAuth
