import express from "express"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

import User from '../models/User'

import AuthMiddleware from "../middleware/auth"

const UserRouter = express.Router()

// Create User
UserRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Account already exist!"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      username,
      password: hashedPassword
    })

    return res.status(200).json({
      success: true,
      message: "Account created successfully!"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${err.message}`
    })
  }
})

// Login User
const { JWT_SECRET } = process.env

UserRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!"
      })
    }

    if (user.token) {
      try {
        jwt.verify(user.token, process.env.JWT_SECRET)
        return res.status(400).json({
          success: false,
          message: "Account logged in! Logout from other device"
        })
      } catch {
        user.token = null
      }
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!"
      })
    }

    const token = await jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "4d" })
    user.token = token

    await user.save()

    return res.status(201).json({
      success: true,
      message: "User logged in successfully!",
      token,
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

// Logout User
UserRouter.post('/logout', AuthMiddleware, async (req, res) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    user.token = null

    await user.save()

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

export default UserRouter