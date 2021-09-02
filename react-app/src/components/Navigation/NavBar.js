import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import LogoutButton from "../auth/LogoutButton"
import SignUpFormModal from "../auth/SignUpFormModal"
import LoginFormModal from "../auth/LoginFormModal"
import AddBookButton from "../Books/AddBookButton"
import CollectionFormModal from "../Collections/CollectionFormModal"
import "./Navigation.css"
import UpdateCFormModal from "../Collections/UpdateCollection"

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
          <li className="nav-collection">
            <CollectionFormModal />
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
            <li className="nav_login">
              <LoginFormModal />
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
