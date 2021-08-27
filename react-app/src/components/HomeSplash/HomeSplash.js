import React from "react"
import { useSelector } from "react-redux"
import Home from "./Home"
import "./HomeSplash.css"
import Splash from "./Splash"

function HomeSplash() {
  const user = useSelector(state => state.session.user)

  return (
    <div>
      {user ? <Home /> : <Splash />}
    </div>
  )
}

export default HomeSplash
