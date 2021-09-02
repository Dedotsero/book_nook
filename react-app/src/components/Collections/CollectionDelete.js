import React, {useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCollection } from '../../store/collections'
import "./Collection.css"

function DeleteCollection({collection}) {
  const dispatch = useDispatch()

  const onClick = async (e) => {
    e.preventDefault()
    await dispatch(deleteCollection(collection.id))
  }

  useEffect(() => {
    dispatch(deleteCollection())
  },[dispatch])

  return (
    <>
      <button className="delete-collection-button" onClick={onClick}><i class="fas fa-trash-alt"></i></button>
    </>
  )
}

export default DeleteCollection
