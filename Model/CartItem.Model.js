import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
   productId: {
    type: mongoose.Schema.Types.ObjectId , 
    ref:"products" ,
    required: true
   },
   quantity: { type: Number,
     required: true },
})


const cart = mongoose.model("Cart", CartSchema)

export default cart;