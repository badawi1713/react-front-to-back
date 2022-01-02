import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from 'assets/svg/keyboardArrowRightIcon.svg'
import { toast } from "react-toastify"

const ForgotPassword = () => {
    const auth = getAuth()

    const [email, setEmail] = useState("")

    const onChange = e => {
        setEmail(e.target.value)
    }

    const onSubmit = async e => {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email)
            toast.success("Reset link was sent to your email")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot Password</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input placeholder="Email" type="email" name="email" id="email" className="emailInput" onChange={onChange} />
                    <Link to='/sign-in' className="forgotPasswordLink">
                        Sign In
                    </Link>

                    <div className="signInBar">
                        <div className="signInText">
                            Send Reset Link
                        </div>
                        <button className="signInButton">
                            <ArrowRightIcon fill="#fff" widht="36px" height="36px" />
                        </button>
                    </div>
                </form>

            </main>
        </div>
    )
}

export default ForgotPassword
