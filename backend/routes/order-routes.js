import express from 'express'

const OrderRouter = express.Router()

import AuthMiddleware from '../middleware/auth'
import Order from '../models/Order'
import Cart from '../models/Cart'

OrderRouter.post('/', AuthMiddleware, async (req, res) => {
  try {
    const userId = req.user._id

    const cart = await Cart.findOne({ userId })

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      })
    }

    const order = await Order.create({
      user: userId,
      items: cart.items,
      total: cart.total
    })

    // Clear the cart after order is placed
    cart.items = []
    cart.total = 0
    await cart.save()

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

OrderRouter.get('/', AuthMiddleware, async (req, res) => {
  try {
    const userId = req.user._id

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

export default OrderRouter
