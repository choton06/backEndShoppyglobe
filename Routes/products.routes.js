
// importing funtion for handling Products releted actions from product controll folder
import { fetchproducts,fecthProduct } from "../Controller/products.controller.js"

// Defining and exporting a function to set up products-related API routes
export function ProductRoutes(app){
    // Route for fetching products
    // Calls the `fetchproducts` function from the products controller when a GET request is made to `/api/products`
  app.get("/api/products" ,fetchproducts);

    // Route for fetching single product by id
    // Calls the `fecthProduct` function from the products controller when a GET request is made to `/api/products/id`
  app.get("/api/products/:id",fecthProduct)
}