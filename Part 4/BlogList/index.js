const app=require('./app')
const {URL, PORT}=require('./Utils/config')
const logger=require('./Utils/logger')


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})