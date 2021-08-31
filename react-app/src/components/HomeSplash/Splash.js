import React from "react"
import "./Splash.css"

function Splash() {
  return (
    <div className="splash-container">
      <h1 className="splash-title">Splash</h1>
      <div className='about-me-container'>
              <a href='https://github.com/dedotsero'>
                <button className='github-button font red'>
                  <i class="fab fa-github-square">Github</i>
                </button>
              </a>
              <a href='https://www.linkedin.com/in/dalton-klossman/'>
                <button className='linkedin-button profile font red'>
                  <i class="fab fa-linkedin">LinkedIn</i>
                </button>
              </a>
            </div>
    </div>
  )
}

export default Splash
