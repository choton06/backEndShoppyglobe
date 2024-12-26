// Importing functions for handling user-related actions from the User controller
import { Register, LogIn } from "../Controller/User.controller.js"; 

// Defining and exporting a function to set up user-related API routes
export function userRoutes(app) {
    // Route for user registration
    // Calls the `Register` function from the User controller when a POST request is made to `/api/register`
    app.post("/api/register", Register);

    // Route for user login
    // Calls the `LogIn` function from the User controller when a POST request is made to `/api/login`
    app.post("/api/login", LogIn);
}
