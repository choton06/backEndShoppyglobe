// Importing the Cart model to interact with the cart collection in the database
import cart from "../Model/CartItem.Model.js";

// Importing the Product model to validate product details and stock levels
import Product from "../Model/Products.Model.js";

// Controller function to add a new item to the cart
export async function Addcart(req, res) {
    try {
        // Extracting productId and quantity from the request body
        const { productId, quantity } = req.body;

        // Fetching the product from the database to validate its existence and stock
        const product = await Product.findById(productId);
        if (!product) {
            // If the product does not exist, return a 404 error
            return res.status(404).json({ error: "Product not found" });
        }

        // Checking if the requested quantity exceeds the product's available stock
        if (quantity > product.stock_quantity) {
            return res.status(400).json({ error: "Insufficient stock" }); // Bad Request
        }

        // Creating a new cart item and saving it to the database
        const cartItem = new cart({ productId, quantity });
        await cartItem.save();

        // Sending a success response with the created cart item
        res.status(201).json(cartItem); // Created
    } catch (err) {
        // Handling any server-side errors
        res.status(500).json({ error: "Internal server error" }); // Internal Server Error
    }
}

// Controller function to retrieve all cart items
export async function GetcartItem(req, res) {
    try {
        // Fetching all cart items from the database
        const cartItems = await cart.find();

        // Sending the cart items as the response
        res.status(200).json(cartItems); // OK
    } catch (error) {
        // Handling any server-side errors
        res.status(500).json({ error: "Internal server error" }); // Internal Server Error
    }
}

// Controller function to update the quantity of a specific cart item
export async function UpdateCart(req, res) {
    try {
        // Extracting the new quantity from the request body
        const { quantity } = req.body;

        // Fetching the cart item to be updated using its ID from the request parameters
        const cartItem = await cart.findById(req.params.id);
        if (!cartItem) {
            // If the cart item does not exist, return a 404 error
            return res.status(404).json({ error: "Cart item not found" });
        }

        // Fetching the associated product to validate stock levels
        const product = await Product.findById(cartItem.productId);
        if (!product) {
            // If the product associated with the cart item does not exist
            return res.status(404).json({ error: "Associated product not found" });
        }

        if (quantity > product.stock_quantity) {
            // If the requested quantity exceeds stock, return a 400 error
            return res.status(400).json({ error: "Insufficient stock" }); // Bad Request
        }

        // Updating the cart item's quantity and saving the changes
        cartItem.quantity = quantity;
        await cartItem.save();

        // Sending the updated cart item as the response
        res.status(200).json(cartItem); // OK
    } catch (err) {
        // Handling any server-side errors
        res.status(500).json({ error: "Internal server error" }); // Internal Server Error
    }
}

// Controller function to delete a specific cart item
export async function DeleteCart(req, res) {
    try {
        // Extracting the ID of the cart item to be deleted from the request parameters
        const id = req.params.id;

        // Finding and deleting the cart item from the database
        const deletedItem = await cart.findByIdAndDelete(id);
        if (!deletedItem) {
            // If the cart item does not exist, return a 404 error
            return res.status(404).json({ error: "Cart item not found" });
        }

        // Sending a success response for the deleted cart item
        res.status(200).json({ message: "Cart item deleted successfully", deletedItem }); // OK
    } catch (err) {
        // Handling any server-side errors
        res.status(500).json({ error: "Internal server error" }); // Internal Server Error
    }
}

