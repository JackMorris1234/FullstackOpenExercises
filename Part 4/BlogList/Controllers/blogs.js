const blogsRouter=require('express').Router()
const Blog=require('../Models/blog')
const User=require('../Models/user')


blogsRouter.get('/', async (request, response, next) => {
  const blogs=await Blog.find({}).populate('user')
  response.json(blogs)
  
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const user=await User.findOne({})

  blog.user=user.id
  const result=await blog.save()
  
  user.blogs = user.blogs.concat(result.id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response, next)=>{
  const id=request.params.id
  const result=await Blog.findByIdAndDelete(id)
  response.status(204).json(result)
})

blogsRouter.put(`/:id`, async (request, response, next)=>{
  const id=request.params.id
  const result=await Blog.replaceOne({ _id: id }, request.body)
  response.status(200).json(result)
})

module.exports =blogsRouter
