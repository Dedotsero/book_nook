import React from 'react'
import { useDispatch } from 'react-redux'
import { createBook } from '../../store/books'

const AddBookButton = () => {
  const dispatch = useDispatch()
  const onClick = async (e) => {
    await dispatch(createBook())
  }

  return <button onClick={onClick}>Add a Book</button>
}

export default AddBookButton
