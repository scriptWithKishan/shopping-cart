import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(cors())
app.use(express.json())

dotenv.config()

// Connect to MongoDB
const { MONGO_URI } = process.env

  ; (async function () {
    try {
      await mongoose.connect(MONGO_URI)
      console.log('MongoDB server connected successfully')
    } catch (err) {
      console.error(`Error in connecting to MongoDB ${err.message}`)
      process.exit(1)
    }
  })()


// Routes

import UserRouter from "./routes/user-routes.js"
import ProductRouter from "./routes/product-routes.js"
import CartRouter from './routes/cart-routes.js'
import OrderRouter from './routes/order-routes.js'

app.use('/users', UserRouter)
app.use('/items', ProductRouter)
app.use('/carts', CartRouter)
app.use('/orders', OrderRouter)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  })
})

// Running the server 
const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})