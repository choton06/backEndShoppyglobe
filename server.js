
// Importing necessary modules
import express from "express"; // Express framework for building server-side applications
import mongoose from "mongoose"; // Mongoose library for MongoDB object modeling

// Importing route handlers from different modules
import { ProductRoutes } from "./Routes/products.routes.js"; // Routes for product-related API endpoints
import { CartRoutes } from "./Routes/Carts.routes.js"; // Routes for cart-related API endpoints
import { userRoutes } from "./Routes/users.routes.js"; // Routes for user-related API endpoints

// Creating an Express application instance
const app = new express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Starting the server on port 3000
app.listen(3100, () => {
    console.log("Server running on Port: 3100"); // Logs a message when the server is running
});

// Connecting to the MongoDB database using Mongoose
mongoose.connect("mongodb+srv://pratiksamanta:pratik@cluster0.lze25.mongodb.net/");

// Accessing the database connection object
const db = mongoose.connection;

// Handling database connection errors
db.on("error", () => {
    console.log("Connection error"); // Logs a message if there's an error during the database connection
});

// Handling successful database connection
db.on("open", () => {
    console.log("Connection successful"); // Logs a message when the database connection is established
});

// Attaching the Product-related routes to the app
ProductRoutes(app);

// Attaching the Cart-related routes to the app
CartRoutes(app);

// Attaching the User-related routes to the app
userRoutes(app);

