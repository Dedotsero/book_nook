import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { useDispatch } from "react-redux"
import LoginForm from "./components/auth/LoginForm"
import NavBar from "./components/Navigation/NavBar"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import UsersList from "./components/UsersList"
import User from "./components/User"
import { authenticate } from "./store/session"
import Collection from "./components/Collections/Collections"
import SingleCollection from "./components/Collections/SingleCollection"
import Book from "./components/Books"
import HomeSplash from "./components/HomeSplash/HomeSplash"

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true)
    })()
  }, [dispatch])

  if (!loaded) {
    return null
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded} />
      {loaded && (
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          {/* <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route> */}
          <ProtectedRoute path="/users" exact={true} >
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true} >
            <User />
          </ProtectedRoute>
          <Route path="/" exact={true} >
            <HomeSplash />
          </Route>
          <ProtectedRoute exact={true} path="/collections/:collectionId">
            <SingleCollection />
          </ProtectedRoute>
          <ProtectedRoute exact path="/collections">
            <Collection />
          </ProtectedRoute>
          <ProtectedRoute path="/books">
            <Book />
          </ProtectedRoute>
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default App
