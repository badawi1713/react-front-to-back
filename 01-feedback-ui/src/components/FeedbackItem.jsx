import { Card } from "./shared"
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'

const FeedbackItem = ({ item, handleDelete }) => {
    return (
        <Card>
            <div className="num-display">{item.rating}</div>
            <button onClick={() => handleDelete(item.id)} className="close">
                <FaTimes color="purple" />
            </button>
            <div className="text-display">{item.content || "This user is too lazy to review...."}</div>
        </Card>
    )
}

FeedbackItem.propTypes = {
    item: PropTypes.object
}

export default FeedbackItem
