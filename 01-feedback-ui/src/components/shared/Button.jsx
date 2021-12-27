import PropTypes from 'prop-types'

const Button = ({
    children, variant = "primary" || "secondary", type = "button" || "submit" || "reset", isDisabled = true || false
}) => {
    return (
        <button type={type} disabled={isDisabled} className={`btn btn-${variant}`}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    isDisabled: false,
    type: "button",
    variant: "primary"
}

Button.propTypes = {
    isDisabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    variant: PropTypes.string
}

export default Button
