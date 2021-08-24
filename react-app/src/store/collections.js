const LOAD_COLLECTIONS = "collections/LOAD_COLLECTIONS"
const LOAD_ONE_COLLECTION = "collections/LOAD_ONE_COLLECTION"
const ADD_COLLECTION = "collections/ADD_COLLECTION"
const UPDATE_COLLECTION = "collections/UPDATE_COLLECTION"
const DELETE_COLLECTION = "collections/DELETE_COLLECTION"

const loadCollections = (collections) => ({
  type: LOAD_COLLECTIONS,
  collections
})

const loadOneCollection = (collection) => ({
  type: LOAD_ONE_COLLECTION,
  collection
})

const addCollection = (collection) => ({
  type: ADD_COLLECTION,
  collection
})

const updateCollection = (collection) => ({
  type: UPDATE_COLLECTION,
  collection
})

const removeCollection = (collection) => ({
  type: DELETE_COLLECTION,
  collection
})

export const getCollections = () => async (dispatch) => {
  const response = await fetch(`/api/collections/`)
  if (response.ok) {
    const collections = await response.json()
    dispatch(loadCollections(collections))
  }
}

export const getOneCollection = (id) => async (dispatch) => {
  const response = await fetch(`/api/collections/${id}`)
  if (response.ok) {
    const collection = await response.json()
    dispatch(loadOneCollection(collection))
  }
}

export const createCollection = (collection) => async (dispatch) => {
  const response = await fetch(`/api/collections/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collection)
  })
  if (response.ok) {
    const newCollection = await response.json()
    dispatch(addCollection(newCollection))
  }
}

export const editCollection = (id, collection) => async (dispatch) => {
  const response = await fetch(`/api/collections/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collection)
  })
  if (response.ok) {
    const updatedCollection = await response.json()
    dispatch(updateCollection(updatedCollection))
  }
}

export const deleteCollection = (id) => async (dispatch) => {
  const response = await fetch(`/api/collections/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  })
  if (response.ok) {
    const deletedCollecton = await response.json()
    dispatch(removeCollection(deletedCollecton))
  }
}

const initialState = {}

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOAD_COLLECTIONS:
      newState = {}
      action.collections.collection.forEach(collection => {
        newState[collection.id] = collection
      })
      return {
        ...newState
      }
    case LOAD_ONE_COLLECTION:
      newState = {}
      newState["current"] = action.collection
      return {
        ...state,
        // "current":
      }
    case ADD_COLLECTION:
      return {
        ...state,
        [action.collection.id]: action.collection
      }
    case UPDATE_COLLECTION:
      return {
        ...state,
        [action.collection.id]: action.collection
      }
    case DELETE_COLLECTION:
      newState = { ...state }
      delete newState[action.collection.id]
      return newState
    default:
      return state
  }
}
