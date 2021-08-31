import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { signUp } from "../../store/session"
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const onSignUp = async (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password))
      if (data) {
        setErrors(data)
      }
    }
    else{
      return setErrors(["Passwords must Match"])
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <div id="signup-form">
      <form onSubmit={onSignUp}>
        <div>
          <div className="signup-title">
            <h2>SIGN UP</h2>
          </div>
          <ul>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))}
          </ul>
        </div>
        <div>
          <label id="username-label">
            Username
          </label>
          <div className="username-signup-input-container">
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            />
          </div>
        </div>
        <div>
          <label id="email-label">
            Email
          </label>
          <div className="email-signup-input-container">
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            />
          </div>
        </div>
        <div>
          <label id="password-label">
            Password
          </label>
          <div className="password-signup-input-container">
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            />
          </div>
        </div>
        <div>
          <label id="confirmPassword-label">
            Confirm Password
          </label>
          <div className="confirmPassword-signup-input-container">
            <input
              type="password"
              name="confirm_password"
              onChange={updateConfirmPassword}
              value={confirmPassword}
              required={true}
            />
          </div>
        </div>
        <div className="signup-buttons">
          <button type="submit" id="signup-submit">SIGN UP</button>
          {/* <button type="button" id="signup-cancel">CANCEL</button> */}
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
