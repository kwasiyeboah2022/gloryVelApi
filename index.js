// index.js
const express = require('express')
const connectDB = require('./db')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())

// Connect to MongoDB
connectDB()

// Register API routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
