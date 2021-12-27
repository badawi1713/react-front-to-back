import { useState } from "react"
import { FeedbackRating } from "."
import { Button, Card } from "./shared"

const FeedbackForm = ({handleSubmit}) => {

    const [review, setReview] = useState("")
    const [message, setMessage] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [selected, setSelected] = useState(0)

    const handleChange = (e) => {
        setSelected(+e.target.value)
    }

    const handleTextChange = (e) => {
        if (review.length <= 10) {
            setMessage('Text must be at 10 characters...')
            setDisabled(true)
        } else {
            setMessage(null)
            setDisabled(false)
        }

        setReview(e.target.value)
    }

   

    return (
        <Card>
            <form onSubmit={(e) => {
                handleSubmit(e, review, selected)
                setMessage(null)
                setDisabled(true)
                setReview("")
                setSelected(0)
            }}>
                <h2>How do you rate your service with us?</h2>
                {/* @todo - rating select component */}
                <FeedbackRating selected={selected} handleChange={handleChange} />
                <div className="input-group">
                    <input type="text" placeholder={'Write a review'} onChange={handleTextChange} value={review} />
                    <Button isDisabled={disabled} type="submit">Send</Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm