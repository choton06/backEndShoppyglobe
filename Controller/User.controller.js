import UserModel from "../Model/user.Model.js"; // Importing the User model
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import jwt from "jsonwebtoken"; // Importing jwt for token generation

// Controller function for user registration
export async function Register(req, res) {
    try {
        // Extracting FullName, Email, and Password from the request body
        const { FullName, Email, Password } = req.body;

        // Checking if the user already exists in the database
        const userData = await UserModel.findOne({ Email });
        if (userData) {
            // Returning a 403 Forbidden status if the user already exists
            return res.status(403).json({ message: "User already exists" });
        } else {
            // Creating a new user with hashed password (asynchronous)
            const newUser = new UserModel({
                FullName,
                Email,
                Password: await bcrypt.hash(Password, 10), // Hashing the password asynchronously
            });

            // Saving the new user to the database
            const newUserData = await newUser.save();

            // Returning a 201 Created status with the newly created user data
            res.status(201).json({ message: "User created successfully", user: newUserData });
        }
    } catch (error) {
        // Returning a 500 Internal Server Error status for unexpected issues
        res.status(500).json({ message: error.message });
    }
}

// Controller function for user login
export async function LogIn(req, res) {
    try {
        // Extracting Email and Password from the request body
        const { Email, Password } = req.body;

        // Finding the user by email in the database
        const userData = await UserModel.findOne({ Email });
        if (!userData) {
            // Returning a 404 Not Found status if the user is not registered
            return res.status(404).json({ message: "User is not registered" });
        }

        // Validating the provided password against the hashed password in the database (asynchronous)
        const validPassword =  bcrypt.compare(Password, userData.Password);
        if (!validPassword) {
            // Returning a 403 Forbidden status if the password is invalid
            return res.status(403).json({ message: "Invalid password" });
        }

        // Generating a JWT token for the authenticated user (with expiration)
        const token = jwt.sign({ id: userData._id }, "secretKey", { expiresIn: "1h" });

        // Returning a 200 OK status with the user's details and access token
        res.status(200).json({
            user: {
                Email: userData.Email,
                FullName: userData.FullName,
            },
            accessToken: token,
        });
    } catch (error) {
        // Returning a 500 Internal Server Error status for unexpected issues
        res.status(500).json({ message: error.message });
    }
}

