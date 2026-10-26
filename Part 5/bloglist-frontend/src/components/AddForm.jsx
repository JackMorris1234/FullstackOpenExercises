import { useState } from 'react'

const AddForm=({ handleAdd }) => {
  const [title, setTitle]=useState('')
  const [author, setAuthor]=useState('')
  const [url, setUrl]=useState('')


  const addBlog=event => {
    event.preventDefault()
    handleAdd( { title:title, author:author, url:url } )
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <form onSubmit={addBlog}>
      <label>
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
      <button type='submit'>Add Blog</button>
    </form>

  )
}

export default AddForm