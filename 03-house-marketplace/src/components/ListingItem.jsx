import { ReactComponent as DeleteIcon } from 'assets/svg/deleteIcon.svg'
import bedIcon from 'assets/svg/bedIcon.svg'
import bathtubIcon from 'assets/svg/bathtubIcon.svg'
import { Link } from 'react-router-dom'
import { NumberFormat } from 'helpers'

const ListingItem = ({ listing, id, onDelete }) => {
    return (
        <li className='categoryListing'>
            <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
                <img src={listing.imageUrls} alt={id} className='categoryListingImg' />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">
                        {listing.location}
                    </p>
                    <p className="categoryListingName">
                        {listing.name}
                    </p>
                    <p className="categoryListingPrice">
                        ${listing.offer ? NumberFormat(listing.discountedPrice) : NumberFormat(listing.regularPrice)}
                        {listing.type === 'rent' && ' / Month'}
                    </p>
                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt="bed" />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                        </p>
                        <img src={bathtubIcon} alt="bed" />
                        <p className="categoryListingInfoText">
                            {listing.bathroom > 1 ? `${listing.bathroom} Bathrooms` : '1 Bathroom'}
                        </p>
                    </div>
                </div>
            </Link>
            {
                onDelete && (
                    <DeleteIcon className='removeIcon' fill='#ff0000' onClick={() => onDelete(id, listing.name)} />
                )
            }
        </li>
    )


}

export default ListingItem
