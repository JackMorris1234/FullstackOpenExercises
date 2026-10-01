const express = require('express')
const mongoose = require('mongoose')
const {URL, PORT}=require('./Utils/config')
const logger = require('./Utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter=require('./Controllers/blogs')

const app = express()


logger.info('connecting to', URL)
mongoose
  .connect(URL, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app