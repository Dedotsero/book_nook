import React from "react"
import BookForm from "./BookForm"
import "./BookForm.css"

const AddBookButton = () => {

  return (
    <div>
      <div className="dropdown">
        <button className="drop-button">Add a Book</button>
        <div className="dropdown-content">
          <BookForm />
        </div>
      </div>
    </div>

  )
}

export default AddBookButton
