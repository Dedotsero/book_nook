import React, { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBooks } from "../store/books"

function Book() {
  const books = useSelector(state => state.books)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
  },[])

  return (
    <div>
      {Object.keys(books).map(child => {
        return (
          <li key={books[child]?.title}>{books[child]?.title}</li>
        )
      })}
    </div>
  )
}

export default Book
