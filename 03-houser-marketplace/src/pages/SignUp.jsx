import { useState } from "react"
import { ReactComponent as ArrowRightIcon } from 'assets/svg/keyboardArrowRightIcon.svg'
import { Link, useNavigate } from "react-router-dom"
import visibilityIcon from 'assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from 'configs/firebase.config'
import { toast } from "react-toastify"
import { OAuth } from "components"

const SignUp = () => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))

    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName: name
            })
            const newFormData = { ...formData }
            delete newFormData.password
            newFormData.timeStamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), newFormData)
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back</p>
                </header>
                <form onSubmit={onSubmit}>
                    <input type="name" name="name" id="name" value={name} placeholder="Name" className="nameInput" onChange={onChange} />
                    <input type="email" name="email" id="email" value={email} placeholder="Email" className="emailInput" onChange={onChange} />
                    <div className="passwordInputDiv">
                        <input type={showPassword ? "text" : "password"} className="passwordInput" id="password" value={password} placeholder="Password" onChange={onChange} />
                        <img src={visibilityIcon} alt="icon" onClick={() => setShowPassword(!showPassword)} className="showPassword" />
                    </div>

                    <Link className="forgotPasswordLink" to="/forgot-password">Forgot Password</Link>
                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button type="submit" className="signUpButton">
                            <ArrowRightIcon fill="#fff" width={"34px"} height={"34px"} />
                        </button>
                    </div>
                </form>
                <OAuth />
                <Link to='/sign-in' className='registerLink'>
                    Already have an accout? Sign In Instead
                </Link>
            </div>
        </>
    )
}

export default SignUp
