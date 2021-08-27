import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { login } from "../../store/session"

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
    const data = await dispatch(login("demo@aa.io", "password"))
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
    <div>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        <form onSubmit={handleDemo}>
          <button onSubmit={handleDemo} className="demo-login" type="submit">Demo Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
