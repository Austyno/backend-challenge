const Product = require('../models/productModel')
const cloudinaryUtils = require('../utils/cloudinary.utils')


const createProduct = async (req,res,next)=> {

  const {name,description,qty,unitPrice} = req.body

  if (!req.files || !req.files?.image){
    return res.status(400).json({
      status:'failed',
      message:"please provide a product image",
      data:[]
    })
  }
  
  let errors = {};

      if (!name) {
        errors.name = 'please provide a product name';
      }

      if (!description) {
        errors.description = 'please provide product description';
      }

      if (!qty) {
        errors.quantity = 'please provide available product quantity';
      }
      if(!unitPrice){
        errors.unitPrice = 'please provide the unit price for this product'
      }

      if(Object.keys(errors).length > 0){
        return res.status(400).json({
          status: 'failed',
          message: 'Please provide all required fields.',
          data: errors
        })
      }
      try {
        const { url, public_id } = await cloudinaryUtils.uploadImage(
          req.files?.image?.tempFilePath,
          'products'
        )

        const payload = {
          description,
          quantity:qty,
          name,
          unitPrice,
          image_url: url,
          image_id: public_id,
        }

        const product = await Product.create(payload)

        return res.status(201).json({
          status:"success",
          message:"product created successfuly",
          data:product
        })
      } catch (e) {
        return next(e)
      }
}

module.exports = createProduct