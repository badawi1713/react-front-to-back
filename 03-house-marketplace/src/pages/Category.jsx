import { ListingItem, Spinner } from "components"
import { db } from "configs/firebase.config"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const Category = () => {


    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()

    useEffect(() => {

        const fetchListings = async () => {
            try {

                // get reference
                const listingsRef = await collection(db, 'listings')

                // create a query
                const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10))

                // execute query
                const querySnap = await getDocs(q)

                let listings = []

                await querySnap.forEach(doc => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });

                await setListings(listings)
                await setLoading(false)

            } catch (error) {
                setLoading(false)
                toast.error('Could not fetch listings')
            }
        }

        fetchListings()

    }, [params.categoryName])

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
                </p>
            </header>
            {loading ? <Spinner /> :
                listings && listings.length > 0 ? <main>
                    <ul className="categoryListings">
                        {listings?.map((item) => (
                           <ListingItem listing={item.data} id={item.id} />
                        ))}
                    </ul>
                </main> : !loading && <p>No listings for {params.categoryName}</p>}
        </div>
    )
}

export default Category
