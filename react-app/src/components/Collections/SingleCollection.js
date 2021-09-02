import React, { useEffect} from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getOneCollection } from "../../store/collections"
import Collection from "./Collections"
import "./Collection.css"


function SingleCollection({collection}) {
  // const books = useSelector(state => state.collections.books)
  // const dispatch = useDispatch()
  // const { collectionId } = useParams()
  // const collection = useSelector(state => state.collections)

  // useEffect(() => {
  //   dispatch(getOneCollection(collectionId))
  // },[])

  return (
    <div>
      {JSON.stringify(collection.books)}
      <div className="book-div">
        {Object.keys(collection.books).map(child => {
          return (
            <div className="book-cover-div" key={collection.books[child].title}>
              <img className="book-cover" src={collection.books[child].book_cover_url} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleCollection

// import React from "react"
// import CollectionFormModal from "./CollectionFormModal"
// import "./Collection.css"

// const AddCollectionButton = () => {

//   return (
//     <div>
//       <div className="dropdown">
//         <button className="drop-button">Collections</button>
//         <div className="dropdown-content">
//           <CollectionFormModal />
//         </div>
//       </div>
//     </div>

//   )
// }

// export default AddCollectionButton
