require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI_BLOGAPP = process.env.MONGODB_URI_BLOGAPP

module.exports = {
  MONGODB_URI_BLOGAPP,
  PORT
}