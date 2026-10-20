import Button from './Button'
import {useState} from 'react'
import blogService from '../services/blogs'

const AddBlog=({blogs, setBlogs, setSuccessMessage, user})=>{
    const [title, setTitle]=useState('')
    const [author, setAuthor]=useState('')
    const [url, setUrl]=useState('')

    const handleNewBlog=async event=>{
        event.preventDefault()
        const blog={title: title, author: author, url: url}
        blogService.create(blog)
        setBlogs(blogs.concat(blog))
        setSuccessMessage(`new blog added by ${user.username}`)
        setTimeout(() => {
                setSuccessMessage(null)
        }, 5000) 

    }



    return(
        <div>
            <label>
                Title: 
                <input
                type='text'
                value={title}
                onChange={({target})=>setTitle(target.value)}>
                </input>
            </label>
            <label>
                Author: 
                <input
                type='text'
                value={author}
                onChange={({target})=>setAuthor(target.value)}>
                </input>
            </label>
            <label>
                Url: 
                <input
                type='text'
                value={url}
                onChange={({target})=>setUrl(target.value)}>
                </input>
            </label>
            <Button handleClick={handleNewBlog} text='Add Blog'/>
        </div>

    )
}
export default AddBlog