require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT
module.exports = {SECRET_KEY,MONGO_URL,PORT}