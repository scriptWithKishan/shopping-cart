import express from 'express'

const ProductRouter = express.Router()

import Item from '../models/Item.js'
import AuthMiddleware from '../middleware/auth.js'

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

// Get a single product
ProductRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const product = await Item.findById(id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    const name = product.name

    return res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      name
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`
    })
  }
})

export default ProductRouter