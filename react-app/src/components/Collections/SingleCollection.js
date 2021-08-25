import React, { useEffect} from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getOneCollection } from "../../store/collections"
import Collection from "./Collections"


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
      <div>
        {Object.keys(collection.books).map(child => {
          return (
            <div key={collection.books[child].title}>
              <img src={collection.books[child].book_cover_url} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleCollection
