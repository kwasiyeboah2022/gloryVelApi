// routes.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./user')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the password already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
    })
    await user.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' })
  }
})

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Create and return a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' })
  }
})

module.exports = router
