import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Item = mongoose.model("Item", ItemSchema)

export default Item