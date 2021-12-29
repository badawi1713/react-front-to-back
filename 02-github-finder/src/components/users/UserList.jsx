import { useContext } from "react"
import { Spinner, UserItem } from ".."
import GithubContext from "../../context/github/GithubContext"

const UserList = () => {

    const { users, loading, isNotFound } = useContext(GithubContext)


    return loading ? <>
        <Spinner /></> : isNotFound ? <h2 className="font-thin italic">Sorry, user is not found...</h2> :
        <section className="grid grid-cols-1 gap-8 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 ">
            {users.map(item => (
                <UserItem key={item.login} user={item} />
            ))}
        </section>
}

export default UserList
