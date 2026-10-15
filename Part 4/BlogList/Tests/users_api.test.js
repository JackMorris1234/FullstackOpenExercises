const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog=require('../Models/blog')
const assert = require('node:assert')
const bcrypt = require('bcryptjs')
const User = require('../Models/user')
const helper=require('./test_helper')
const api = supertest(app)





describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const salt=await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash('sekret', salt)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  test('username less than 3 chars not added', async ()=>{
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'Ja',
      name: 'Jack Morris',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

  })
  test('username not unique', async ()=>{
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    const result=await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('expected `username` to be unique'))
  })
  test('empty password', async ()=>{
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'JackManMo',
      name: 'Matti Luukkainen',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
      
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

test('password less than or equal to 3 chars not added', async ()=>{
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'Jackman',
      name: 'Jack Morris',
      password: 'sal',
    }

    const result=await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('password must be at least 3 characters long'))
  })

after(async () => {
  await mongoose.connection.close()
})