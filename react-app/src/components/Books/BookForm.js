import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { createBook } from "../../store/books"
import "./BookForm.css"

const BookForm = () => {
  const [errors, setErrors] = useState([])
  const [isbn, setIsbn] = useState("")
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    const data = await dispatch(createBook(isbn))
    // setIsbn("")
    if(data) {
      setErrors(data)
    }
  }

  useEffect(() => {
    dispatch(createBook())
  }, [dispatch])

  const updateIsbn = (e) => {
    setIsbn(e.target.value)
  }

  // if (user) {
  //   return <Redirect to="/" />
  // }

  return (
    <div id="book-form">
      <form onSubmit={onSubmit}>
        <div className="add-book-title">
          <h2>Add a Book</h2>
        </div>
        <div>
          <ul>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </ul>
        </div>
        <div className="isbn-div">
          <label id="isbn-label" htmlFor="isbn">ISBN 10/13</label>
          <div className="isbn-input-container">
            <input
              name="isbn"
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={updateIsbn}
            />
          </div>
        </div>
        <div className="add-book-button">
          <button type="submit" id="submit-button">Add</button>
        </div>
      </form>
    </div>
  )
}

export default BookForm
