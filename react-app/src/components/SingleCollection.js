import React, { useEffect} from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getOneCollection } from "../store/collections"
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
      {JSON.stringify(collection)}
      {/* {Object.keys(books).map(child => {
        return (
          <li key={books[child]?.book_cover_url}>{books[child]?.book_cover_url}</li>
        )
      })} */}
    </div>
  )
}

export default SingleCollection
