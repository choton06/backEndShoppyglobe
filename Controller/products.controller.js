// Importing the Product model to interact with the products collection in the database
import Product from "../Model/Products.Model.js";

// Controller function to fetch all products
export function fetchproducts(req, res) {
    Product.find()
        .then((data) => {
            // Sending a 200 OK status with the retrieved products
            res.status(200).json(data);
        })
        .catch((error) => {
            // Handling any server-side errors
            res.status(500).json({ error: "Internal server error" });
        });
}


// controller function to  fecth single product by id
export async function fecthProduct(req,res){
    try {
        // fecthing the particuler product by Id from mogodb products collection
        const product = await  Product.findById(req.params.id) ;
        if (!product) {
            // If the product item does not exist, return a 404 error
            return res.status(404).json({ error: "Product not found" });
        }
        // Sending a 200 OK status with the  exact product
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
} 

