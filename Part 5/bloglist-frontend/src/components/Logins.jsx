
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'

const Login=({setUser, setErrorMessage, setSuccessMessage})=>{
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    
    const handleLogin=async event=>{
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            window.localStorage.setItem(
              'BlogListUser', JSON.stringify(user)
            ) 
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            setSuccessMessage('logged in')
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000) 
        } catch {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
    }
    }



    return(
    <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )

}

export default Login