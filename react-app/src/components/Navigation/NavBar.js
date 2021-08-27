import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import LogoutButton from "../auth/LogoutButton"
import SignUpFormModal from "../auth/SignUpModal"
import "./Navigation.css"
import AddBookButton from "../Books/AddBookButton"

function NavBar({ loaded }) {
  const user = useSelector(state => state.session.user)

  let sessionLinks
  if (user) {
    sessionLinks = (
      <nav>
        <ul className="nav_ul">
          <li>
            <NavLink to="/collections" exact={true} activeClassName="active" className="nav_li">
              Collections
            </NavLink>
          </li>
          <li className="nav_book">
            <AddBookButton />
          </li>
          <li className="nav_user">
            Welcome {user.username}
          </li>
          <li className="nav_logout">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    )
  }
  else {
    sessionLinks = (
      <>
        <div>
          <ul className="nav_ul">
            <li>
              <NavLink to="/login" className="nav_login">Login</NavLink>
            </li>
            <li className="nav_signup">
              <SignUpFormModal />
            </li>
          </ul>
        </div>
      </>
    )
  }

  return (
    <div>
      <div>
        <ul className="nav_ul">
          <li className="nav_home">
            <NavLink to="/" exact={true} activeClassName="active">
              <img src={"favicon.ico"} alt="" />
            </NavLink>
          </li>
          <li className="nav_title">
            Book Nook
          </li>
          <li>
            {loaded && sessionLinks}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
