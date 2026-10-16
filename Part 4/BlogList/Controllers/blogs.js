const blogsRouter=require('express').Router()
const Blog=require('../Models/blog')
const User=require('../Models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response, next) => {
  const blogs=await Blog.find({}).populate('user')
  response.json(blogs)
  
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)



  //const user=await User.findOne({})

  blog.user=user.id
  const result=await blog.save()
  
  user.blogs = user.blogs.concat(result.id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response, next)=>{
  const id=request.params.id
  userFromToken=request.user
  if (!request.token) {
    return response.status(401).json({ error: 'token invalid or missing' })
  }

  targetBlog=await Blog.findById(id)

  if(targetBlog.user.equals(userFromToken.id)){
    const result=await Blog.findByIdAndDelete(id)
    response.status(204).json(result)
  }else{
    response.status(401).json({ error: 'token does not match user id of blog' })
  }

})

blogsRouter.put(`/:id`, async (request, response, next)=>{
  const id=request.params.id
  const result=await Blog.replaceOne({ _id: id }, request.body)
  response.status(200).json(result)
})

module.exports =blogsRouter
