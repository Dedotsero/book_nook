const LOAD_BOOKS = "books/LOAD_BOOKS"
const LOAD_ONE_BOOK = "books/LOAD_ONE_BOOK"
const ADD_BOOK = "books/ADD_BOOK"
const DELETE_BOOK = "books/DELETE_BOOK"

const loadBooks = (books) => ({
  type: LOAD_BOOKS,
  books
})

const loadOneBook = (book) => ({
  type: LOAD_ONE_BOOK,
  book
})

const addBook = (book) => ({
  type: ADD_BOOK,
  book
})

const removeBook = (book) => ({
  type: DELETE_BOOK,
  book
})

export const getBooks = () => async (dispatch) => {
  const response = await fetch(`/api/books`)
  if (response.ok) {
    const books = await response.json()
    dispatch(loadBooks(books))
  }
}

export const getOneBook = (id) => async (dispatch) => {
  const response = await fetch(`/api/books/${id}`)
  if (response.ok) {
    const book = await response.json()
    dispatch(loadOneBook(book))
  }
}

export const createBook = (isbn) => async (dispatch) => {
  const response = await fetch(`/api/books/${isbn}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(isbn)
  })
  if (response.ok) {
    const newBook = await response.json()
    dispatch(addBook(newBook))
  }
}

export const deleteBook = (id) => async (dispatch) => {
  const response = await fetch(`/api/books/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  })
  if (response.ok) {
    const deletedBook = await response.json()
    dispatch(removeBook(deletedBook))
  }
}

const initialState = {}

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOAD_BOOKS:
      newState = {}
      action.books.library.forEach(book => {
        newState[book.id] = book
      })
      return {
        ...newState
      }
    case LOAD_ONE_BOOK:
      newState = {}
      newState[action.book.id] = action.book
      return {
        ...state,
        ...newState
      }
    case ADD_BOOK:
      return {
        ...state,
        [action.book.id]: action.book
      }
    case DELETE_BOOK:
      newState = { ...state }
      delete newState[action.book.id]
      return newState
    default:
      return state
  }
}
