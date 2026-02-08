import express from 'express'

const CartRouter = express.Router()

import AuthMiddleware from '../middleware/auth'
import Cart from "../models/Cart"
import Item from "../models/Item"

CartRouter.post('/', AuthMiddleware, async (req, res) => {
  try {
    const userId = req.user._id
    const { productId } = req.body



    const product = await Item.findById(productId)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    let cart = await Cart.findOne({ userId })

    if (cart) {
      const itemIndex = cart.items.findIndex(p => p.product.toString() === productId.toString())

      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex]
        productItem.qty += 1
        productItem.price = product.price
        cart.items[itemIndex] = productItem
      } else {
        cart.items.push({
          product: productId,
          qty: 1,
          price: product.price
        })
      }
    } else {
      cart = new Cart({
        userId,
        items: [{
          product: productId,
          qty: 1,
          price: product.price
        }]
      })
    }

    cart.total = cart.items.reduce((acc, item) => acc + item.qty * item.price, 0)

    await cart.save()

    return res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

CartRouter.get('/', AuthMiddleware, async (req, res) => {
  try {
    const userId = req.user._id
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = await Cart.create({ userId })
    }

    return res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      cart
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

export default CartRouter