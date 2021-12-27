import PropTypes from 'prop-types'

const Header = ({title}) => {
    return (
        <header>
            <div className="container">
                <h2>{title}</h2>
            </div>
        </header>
    )
}

Header.defaultProps = {
    title: "Feedback UI"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
