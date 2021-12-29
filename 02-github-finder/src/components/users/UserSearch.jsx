import { useContext } from "react"
import GithubContext from "context/github/GithubContext"
import AlertContext from "context/alert/AlertContext"

const UserSearch = () => {
    const { changeGithub, search, users, searchUsers, clearGithubState } = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search === '') {
            setAlert({
                message: "Please enter username first",
                type: 'error'
            })
        } else {
            searchUsers()
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative flex">
                            <input type="text" className="w-full pr-40 bg-gray-200 input rounded-r-none input-md  text-black" onChange={(e) => changeGithub({
                                search: e.target.value
                            })} value={search} placeholder="Type Github username..." />
                            <button type="submit" className="absolute top-0 right-0 rounded-none w-36 btn btn-md">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                users.length !== 0 && <div>
                    <button className="btn btn-ghost btn-md" onClick={clearGithubState}>
                        Clear
                    </button>
                </div>
            }
        </div>
    )
}

export default UserSearch
