import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GithubContext from "context/github/GithubContext"
import { useContext } from 'react'

const UserItem = ({ user: { login, avatar_url } }) => {
    
    const { clearGithubState } = useContext(GithubContext)

    return (
        <div className='card shadow-md compact side bg-base-300 p-4'>
            <div className="flex-row items-center gap-4 card-body">
                <div>
                    <div className="avatar">
                        <div className="rounded-full shadow w-14 h-14">
                            <img loading="lazy" src={avatar_url} alt="avatar-profile" />
                        </div>
                    </div>
                </div>
                <div >
                    <h3 className="card-title">
                        {login}
                    </h3>
                    <Link onClick={clearGithubState} className='text-base-content text-opacity-40 hover:text-opacity-80' to={`/user/${login}`}>Visit Profile</Link>
                </div>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItem
