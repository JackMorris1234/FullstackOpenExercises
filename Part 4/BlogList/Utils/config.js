require('dotenv').config()

const PORT = process.env.PORT || 3000
const URL = process.env.MONGODB_URI

module.exports = { URL, PORT } 