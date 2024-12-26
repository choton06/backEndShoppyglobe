// Importing functions for handling Cart-related actions from the Cart controller folder
import { Addcart, UpdateCart, DeleteCart, GetcartItem } from "../Controller/Cart.controller.js";

// Importing middleware for token verification
import { verifytoken } from "../Middleawer/verifytoken.js";

// Defining and exporting a function to set up Cart-related API routes
export function CartRoutes(app) {

    // Route for adding an item to the cart
    // Calls the `Addcart` function from the Cart controller when a POST request is made to `/api/cart`
     // Includes `verifytoken` middleware to ensure the user is authenticated before accessing the cart items
    app.post("/api/cart", verifytoken,Addcart);

    // Route for retrieving cart items
    // Calls the `GetcartItem` function from the Cart controller when a GET request is made to `/api/cartItems`
    // Includes `verifytoken` middleware to ensure the user is authenticated before accessing the cart items
    app.get("/api/cartItems", verifytoken, GetcartItem);

    // Route for updating a specific cart item
    // Calls the `UpdateCart` function from the Cart controller when a PUT request is made to `/api/UpdateCart/:id`
    // Expects a cart item ID as a parameter in the request URL
    app.put("/api/UpdateCart/:id", verifytoken,UpdateCart);

    // Route for deleting a specific cart item
    // Calls the `DeleteCart` function from the Cart controller when a DELETE request is made to `/api/deleteCart/:id`
    // Expects a cart item ID as a parameter in the request URL
    app.delete("/api/deleteCart/:id", verifytoken, DeleteCart);
}
