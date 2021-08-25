import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'
import './Navigation.css'
import AddBookButton from '../Books/AddBookButton'

function NavBar({ loaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <nav>
        <ul className="nav_ul">
          <li>
            <NavLink to='/collections' exact={true} activeClassName='active' className="nav_li">
              Collections
            </NavLink>
          </li>
          <li className="nav_book">
            <AddBookButton />
          </li>
          <li className="nav_logout">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    )
  } else {
    sessionLinks = (
      <>
        <div>
          <ul className='nav_ul'>
            <li>
              <NavLink to="/login" className='nav_li'>Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup" className='nav_li'>Signup</NavLink>
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
            <NavLink to='/' exact={true} activeClassName='active' >
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