import { Spinner } from 'components'
import { useAuthStatus } from 'hooks/useAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

    const { loggedIn, checkingStatus } = useAuthStatus()
    if (checkingStatus) {
        return (
            <Spinner />
        )
    }

    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoutes
