import mongoose from "mongoose"

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
      },
      qty: {
        type: Number,
        default: 1
      },
      price: {
        type: Number,
        required: true
      }
    },
  ],
  total: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

const Cart = mongoose.model("Cart", CartSchema)

export default Cart