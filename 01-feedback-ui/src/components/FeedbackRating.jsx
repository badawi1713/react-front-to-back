import { ratingData } from "../data"

const FeedbackRating = ({ handleChange, selected }) => {


    return (
        <ul className="rating">
            {
                ratingData.map(item => (
                    <li key={item.id}>
                        <input type="radio" name="rating" id={item.id} value={item.value} checked={selected === item.value} onChange={handleChange} />
                        <label htmlFor={item.name}>{item.value}</label>
                    </li>
                ))
            }
        </ul>
    )
}

export default FeedbackRating
