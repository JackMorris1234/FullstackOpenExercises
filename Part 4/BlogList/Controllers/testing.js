const router = require('express').Router()
const Blog = require('../Models/blog')
const User = require('../Models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})
router.post('/resetBlogs', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

module.exports = router