import React from "react"
import { useSelector } from "react-redux"
import Home from "./Home"
import "./HomeSplash.css"
import Splash from "./Splash"

function HomeSplash() {
  const user = useSelector(state => state.session.user)

  let sessionPage
  if (user) {
    sessionPage = (
      <Home />
    )
  }
  else {
    sessionPage = (
      <Splash />
    )
  }

  return (
    <div>
      {user ? <Home /> : <Splash />}
    </div>
  )
}

export default HomeSplash
