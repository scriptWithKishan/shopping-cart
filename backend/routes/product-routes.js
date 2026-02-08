import express from 'express'

const ProductRouter = express.Router()

import Item from '../models/Item'
import AuthMiddleware from '../middleware/auth'

// Post a product
ProductRouter.post('/', AuthMiddleware, async (req, res) => {
  try {
    const { name, description, price, image } = req.body

    if (!name || !description || !price || !image) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required to create a product!'
      })
    }

    const product = await Item.create({
      name,
      description,
      price,
      image
    })

    return res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      product
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

// Get all products
ProductRouter.get('/', async (req, res) => {
  try {
    const products = await Item.find()

    return res.status(201).json({
      success: true,
      message: 'All products fetched successfully',
      products
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

export default ProductRouter