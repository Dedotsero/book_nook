const LOAD_COMMENTS = "comments/SET_COMMENTS"
const ADD_COMMENT = "comments/UNLOAD_COMMENTS"
const UPDATE_COMMENT = "comments/SET_NEW_COMMENT"
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments
})

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
})

const removeComment = (comment) => ({
  type: REMOVE_COMMENT,
  comment
})

export const getComments = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${bookId}/`)
  if (response.ok) {
      const comments = await response.json()
      dispatch(loadComments(comments))
  }
}
export const createComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(comment)
  })
  if (response.ok) {
    const newComment = await response.json()
    dispatch(addComment(newComment))
  }
}

export const editComment = (id, comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment)
  })
  if (response.ok) {
    const updatedComment = await response.json()
    dispatch(updateComment(updatedComment))
  }
}

export const deleteComment = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  })
  if (response.ok) {
    const deletedComment = await response.json()
    dispatch(removeComment(deletedComment))
  }
}


const initialState = {}

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOAD_COMMENTS:
      newState = {}
      action.comments.comment.forEach(comment => {
        newState[comment.id] = comment
      })
      return newState
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case REMOVE_COMMENT:
      newState = { ...state }
      delete newState[action.comment.id]
      return newState
    default:
      return state
  }
}
