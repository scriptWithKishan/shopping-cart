import jwt from "jsonwebtoken"
import User from "../models/User.js"

const AuthMiddleware = async (req, res, next) => {
  try {
    const { JWT_SECRET } = process.env
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: 'Authorization failure: Missing authorization header'
      })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization failure: Missing token"
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    const user = await User.findById(decoded.id).select('-password')

    if (!user || user.token !== token) {
      return res.status(401).json({
        success: false,
        message: "Authorization failure: Invalid token or session expired"
      })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Authorization failure: ${err.message}`
    })
  }
}

export default AuthMiddleware