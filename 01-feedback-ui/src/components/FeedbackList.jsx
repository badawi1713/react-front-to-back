import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FeedbackItem } from '.'
import { Card } from './shared'
import PropTypes from 'prop-types'
const FeedbackList = ({ feedback, handleDelete }) => {
    return <> {!feedback || feedback.length === 0 ? <Card reverse>
        <p style={{ textAlign: 'center' }}>No Feedback yet</p>
    </Card> : <section className="feedback-list">
        <AnimatePresence>
            {feedback.map(item => (
                <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity: 0}}>
                    <FeedbackItem item={item} handleDelete={handleDelete} />
                </motion.div>
            ))}
        </AnimatePresence>
    </section>
    }
    </>
}

FeedbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired
        })
    )
}

export default FeedbackList
