const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog=require('../Models/blog')
const assert = require('node:assert')
const api = supertest(app)

const initialBlogs = [
  {
    title: "String",
    author: "String",
    url: "String",
    likes:1
  },
  {
    title: "String3",
    author: "String3",
    url: "String3",
    likes:1
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(e => e.title)
   
  assert(titles.includes('String'))
})


test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'hello there',
    author: "String",
    url: "String",
    likes: 6,
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('hello there'))
})

after(async () => {
  await mongoose.connection.close()
})