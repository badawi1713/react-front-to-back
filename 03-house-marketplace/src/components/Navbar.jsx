import { ReactComponent as ExploreIcon } from 'assets/svg/exploreIcon.svg'
import { ReactComponent as OfferIcon } from 'assets/svg/localOfferIcon.svg'
import { ReactComponent as PersonIcon } from 'assets/svg/personIcon.svg'
import { useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
    const location = useLocation();
    const { pathname } = location
    const navigate = useNavigate();

    const pathMatchRouteActive = (route = "") => {
        if (route === pathname) {
            return "navbarListItemNameActive"
        } else {
            return "navbarListItemName"
        }
    }

    const pathMatchRoute = (route = "") => {
        if (route === pathname) {
            return "#2c2c2c"
        } else {
            return "#8f8f8f"
        }
    }

    return (
        <footer className="navbar">
            <nav className="navbarNav">
                <ul className="navbarListItems">
                    <li className="navbarListItem" onClick={() => navigate('/')}>
                        <ExploreIcon fill={pathMatchRoute('/')} width='36px' height='36px' />
                        <p className={pathMatchRouteActive('/')}>Explore</p>
                    </li>
                    <li className="navbarListItem" onClick={() => navigate('/offers')}>
                        <OfferIcon fill={pathMatchRoute('/offers')} width='36px' height='36px' />
                        <p className={pathMatchRouteActive('/offers')}>Offers</p>
                    </li>
                    <li className="navbarListItem" onClick={() => navigate('/profile')}>
                        <PersonIcon fill={pathMatchRoute('/profile')} width='36px' height='36px' />
                        <p className={pathMatchRouteActive('/profile')}>Profile</p>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Navbar
