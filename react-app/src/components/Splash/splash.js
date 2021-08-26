import React from "react"
import { useSelector } from "react-redux"
import "./splash.css"

function HomeSplash() {
  const user = useSelector(state => state.session.user)

  return (
    <div className="home-container">
      {/* <h1>My Home Page 2.0</h1> */}
    </div>
  )
}

export default HomeSplash
