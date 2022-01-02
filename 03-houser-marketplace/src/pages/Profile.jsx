import { db } from 'configs/firebase.config'
import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
    const auth = getAuth()
    const navigate = useNavigate()

    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email
    })

    const { email, name } = formData

    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name: name
                })
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.id]: e.target.value
        }))
    }


    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button type='button' onClick={onLogout} className="logOut">
                    Logout
                </button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">
                        Personal Details
                    </p>
                    <p className="changePersonalDetails" onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails(prevState => !prevState)
                    }}>
                        {changeDetails ? 'Done' : 'Change'}
                    </p>
                </div>
                <div className="profileCard">
                    <form >
                        <input disabled={!changeDetails} value={name} onChange={onChange} placeholder='Name' type="text" id="name" className={!changeDetails ? 'profileName' : 'profileNameActive'} />
                        <input disabled={!changeDetails} value={email} onChange={onChange} placeholder='Email' type="text" id="email" className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} />
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Profile
