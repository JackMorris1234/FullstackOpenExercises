import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Logins'
import Notification from './components/Notification'
import Button from './components/Button'
import AddBlog from './components/AddBlog'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser]=useState(null)
  const[errorMessage, setErrorMessage]=useState(null)
  const[successMessage, setSuccessMessage]=useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    blogs.sort((blog1, blog2) => blog2.likes-blog1.likes)
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogout=() => {
    setUser(null)
    window.localStorage.removeItem('BlogListUser')
  }

  return (
    <div>
      {!user && <Login setUser={setUser} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>}
      {user && <h1>{user.username} logged in</h1>}
      {user && <Button handleClick={handleLogout} text='Logout'/>}
      <Notification message={errorMessage}/>
      <Notification message={successMessage}/>
      {user &&<AddBlog blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} user={user}/>}
      {user && <h2>blogs</h2> && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs}/>
      )}
    </div>
  )
}

export default App