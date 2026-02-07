import jwt from "jsonwebtoken"

const { JWT_SECRET } = process.env

const AuthMiddleware = async (req, res, next) => {
  try {
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

    let id = decoded.id
    req.id = id
    next()
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Authorization failure: ${err.message}`
    })
  }
}

export default AuthMiddleware