import React, { useState } from "react";
import { FeedbackForm, FeedbackList, FeedbackStats, Header } from "./components";
import { feedbackData } from "./data";
import { v4 as uuid } from 'uuid';

const App = () => {
    const [feedback, setFeedback] = useState(feedbackData)

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            setFeedback(feedback.filter(item => item.id !== id))
        }
    }

    const handleSubmit = (e, review, selected) => {
        e.preventDefault()
        const id = uuid()
        const newFeedback = {
            id: id,
            content: review,
            rating: +selected
        }

        setFeedback([newFeedback, ...feedback])

    }

    return (
        <>
            <Header />
            <main className="container">
                <FeedbackForm handleSubmit={handleSubmit} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
            </main>
        </>
    );
};

export default App;
