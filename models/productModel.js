const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Product name not provided'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Product unitPrice not provided'],
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
    },
    image_url: {
      type: String,
    },
    image_id: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = model('Product', productSchema)
