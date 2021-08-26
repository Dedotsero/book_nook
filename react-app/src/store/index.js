import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import session from "./session"
import collections from "./collections"
import comments from "./comments"
import books from "./books"

const rootReducer = combineReducers({
  session,
  collections,
  comments,
  books
})

let enhancer

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk)
} else {
  const logger = require("redux-logger").default
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  enhancer = composeEnhancers(applyMiddleware(thunk, logger))
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore
