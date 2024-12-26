import mongoose from "mongoose";


const productSchema = mongoose.Schema({
   name: String,
   price : Number,
   description: String,
   stock_quantity: Number
})
// Create the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
