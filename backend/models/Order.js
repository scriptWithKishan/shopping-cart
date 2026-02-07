import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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
        required: true,
      }
    }
  ],
  total: {
    type: Number,
    default: 0
  }
})

const Order = mongoose.model("Order", OrderSchema)

export default Order