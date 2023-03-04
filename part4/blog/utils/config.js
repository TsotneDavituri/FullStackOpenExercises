require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_URI_TESTBLOGAPP
  : process.env.MONGODB_URI_BLOGAPP

module.exports = {
  MONGODB_URI,
  PORT
}