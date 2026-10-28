import { useState } from 'react'
import blogservice from '../services/blogs'
const Blog = ({ blog, setBlogs, blogs, eventHandlerForTesting, user }) => {
  const [detailsVisible, setDetailsVisible]=useState(false)
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike=async () => {
    blog.likes=blog.likes+1
    const returned =await blogservice.like(blog, blog.id)
    console.log('returned after like', returned)
    const newblogs=blogs.map((entry) => entry.id===blog.id? blog :entry)
    newblogs.sort((blog1, blog2) => blog2.likes-blog1.likes)
    setBlogs(newblogs)
  }

  const handleDelete=async() => {
    await blogservice.remove(blog, blog.id)
    const newblogs=blogs.filter((entry) => entry.id!==blog.id)
    setBlogs(newblogs)
  }

  return(
    <div data-testid='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(true)} style={hideWhenVisible}>View</button>
      </div>
      <div style={showWhenVisible}>
          Likes: <label>{blog.likes}</label><button onClick={handleLike}>Like</button>
        <br/>  URL: {blog.url}<br/>
        <button onClick={eventHandlerForTesting}>TestLike</button>
        <div>User: {blog.user.username}</div>
        {user.username===blog.user.username&&<button onClick={handleDelete}>Delete</button>}
        <button onClick={() => setDetailsVisible(false)}>Hide</button>
      </div>
    </div>
  )
}
export default Blog