const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI_NOTES

module.exports = {
  MONGODB_URI,
  PORT
}