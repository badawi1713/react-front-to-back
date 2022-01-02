import { useState } from "react"
import { ReactComponent as ArrowRightIcon } from 'assets/svg/keyboardArrowRightIcon.svg'
import { Link, useNavigate } from "react-router-dom"
import visibilityIcon from 'assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { OAuth } from "components"

const SignIn = () => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

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

            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                navigate('/')
            }
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
                    <input type="email" name="email" id="email" value={email} placeholder="Email" className="emailInput" onChange={onChange} />
                    <div className="passwordInputDiv">
                        <input autoComplete="off" type={showPassword ? "text" : "password"} className="passwordInput" id="password" value={password} placeholder="Password" onChange={onChange} />
                        <img src={visibilityIcon} alt="icon" onClick={() => setShowPassword(!showPassword)} className="showPassword" />
                    </div>

                    <Link className="forgotPasswordLink" to="/forgot-password">Forgot Password</Link>
                    <div className="signInBar">
                        <p className="signInText">
                            Sign In
                        </p>
                        <button type="submit" className="signInButton">
                            <ArrowRightIcon fill="#fff" width={"34px"} height={"34px"} />
                        </button>
                    </div>
                </form>
                <OAuth />
                <Link to='/sign-up' className='registerLink'>
                    Sign Up Instead
                </Link>
            </div>
        </>
    )
}

export default SignIn
