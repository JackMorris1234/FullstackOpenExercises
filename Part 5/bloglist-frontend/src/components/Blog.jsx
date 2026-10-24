import {useState} from 'react'
import blogservice from '../services/blogs'
const Blog = ({ blog, setBlogs, blogs }) => {
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
    const newblogs=blogs.map((entry)=>entry.id===blog.id? blog :entry)
    setBlogs(newblogs)
  }

  const handleDelete=async()=>{
    await blogservice.remove(blog, blog.id)
    const newblogs=blogs.filter((entry)=>entry.id!==blog.id)
    setBlogs(newblogs)
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={()=>setDetailsVisible(true)} style={hideWhenVisible}>View</button>
      </div>
      <div style={showWhenVisible}>
          Likes: {blog.likes}<button onClick={handleLike}>Like</button><br/>  URL: {blog.url}<br/>
          <div>User: {blog.user.username}</div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={()=>setDetailsVisible(false)}>Hide</button>
      </div>
    </div>
  )
}
   
export default Blog