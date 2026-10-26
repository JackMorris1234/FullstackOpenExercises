import Button from './Button'
import { useState } from 'react'
import blogService from '../services/blogs'
import AddForm from './AddForm'

const AddBlog=({ blogs, setBlogs, setSuccessMessage, user }) => {
  // const [title, setTitle]=useState('')
  // const [author, setAuthor]=useState('')
  // const [url, setUrl]=useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const handleNewBlog=async (blog) => {
    const blogFilled={ title: blog.title, author: blog.author, url: blog.url, likes:0, user:{ id:user.id, username:user.username } }
    const returned=await blogService.create(blogFilled)
    setBlogs(blogs.concat(returned))
  	setCreateBlogVisible(false)
    setSuccessMessage(`new blog added by ${user.username}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)}

  return(
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogVisible(true)}>Create New Blog</button>

    	</div>
      <div style={showWhenVisible}>
        <AddForm handleAdd={handleNewBlog}/>
        {/*<label>
                Title:
          <input
          	type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}>
          </input>
        </label>
        <br/>
        <label>
                Author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}>
          </input>
        </label>
        <br/>
        <label>
                Url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}>
          </input>
        </label>
        <Button handleClick={handleNewBlog} text='Add Blog'/>*/}
        <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
    	</div>
    </div>

  )
}
export default AddBlog