import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { login } from "../../store/session"
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const onLogin = async (e) => {
    e.preventDefault()
    setErrors([])
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data)
    }
  }

  const handleDemo = async (e) => {
    e.preventDefault()
    setErrors([])
    await setEmail("demo@aa.io")
    await setPassword("password")
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data)
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <div id="login-form">
      <form onSubmit={onLogin}>
        <div className="login-title">
          <h2>LOG IN</h2>
        </div>
        <div>
          <ul>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </ul>
        </div>
        <div>
          <label id="email-label" htmlFor="email">Email</label>
          <div className="email-login-input-container">
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
        </div>
        <div>
          <label id="password-label" htmlFor="password">Password</label>
          <div className="password-login-input-container">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div >
        </div>
        <div className="login-button">
          <button type="submit" id="login-submit">LOG IN</button>
        </div>
          {/* <button type="button" id="login-cancel">CANCEL</button> */}
        <div className="demo-button">
          <button onClick={handleDemo} id="demo-login" type="button">DEMO</button>
        </div>
      </form>
      {/* <div className="demo-button">
        <form onSubmit={handleDemo}>
        </form>
      </div> */}
    </div>
  )
}

export default LoginForm
