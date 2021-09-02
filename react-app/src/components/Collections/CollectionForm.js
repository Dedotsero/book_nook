import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { createCollection, editCollection } from "../../store/collections"


const CollectionForm = ({operator, id}) => {
  const [errors, setErrors] = useState([])
  const [name, setName] = useState("")
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    const newCollection = {
      name: name
    }
    const data = await dispatch(createCollection(newCollection))
    if(data) {
      setErrors(data)
    }
  }

  const onUpdate = async (e) => {
    e.preventDefault()
    setErrors([])
    const updateCollection = {
      name: name
    }
    const data = await dispatch(editCollection(id, updateCollection))
    if(data) {
      setErrors(data)
    }
  }

  useEffect(() => {
    dispatch(createCollection())
  }, [dispatch])

  const updateName = (e) => {
    setName(e.target.value)
  }

  let form
  if (operator === "new") {
    form = (
      <div id="collection-form">
        <form onSubmit={onSubmit}>
          <div className="new-collection-title">
            <h2>New Collection</h2>
          </div>
          <div>
            <ul>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </ul>
          </div>
          <div className="collection-form-div">
            <label id="name-label" htmlFor="name">Name</label>
            <div className="name-input-container">
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={updateName}
              />
            </div>
          </div>
          <div className="add-collection-button">
            <button type="submit" id="submit-button">Create</button>
          </div>
        </form>
      </div>
    )
  }
  else {
    form = (
      <div id="collection-form">
        <form onSubmit={onUpdate}>
          <div className="new-collection-title">
            <h2>Edit Collection</h2>
          </div>
          <div>
            <ul>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </ul>
          </div>
          <div className="collection-form-div">
            <label id="name-label" htmlFor="name">Name</label>
            <div className="name-input-container">
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={updateName}
              />
            </div>
          </div>
          <div className="add-collection-button">
            <button type="submit" id="submit-button">Edit</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div id="collection-form">
      {form}
      {/* <form onSubmit={onSubmit}>
        <div className="new-collection-title">
          <h2>New Collection</h2>
        </div>
        <div>
          <ul>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </ul>
        </div>
        <div className="collection-form-div">
          <label id="name-label" htmlFor="name">Name</label>
          <div className="name-input-container">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={updateName}
            />
          </div>
        </div>
        <div className="add-collection-button">
          <button type="submit" id="submit-button">Create</button>
        </div>
      </form> */}
    </div>
  )
}

export default CollectionForm
