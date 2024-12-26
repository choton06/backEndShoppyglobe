import jwt from "jsonwebtoken";
import UserModel from "../Model/user.Model.js";

export  function verifytoken(req, res, next) {
    // Check for token in the Authorization header (assuming Bearer token format)
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
        // Extract the token from the header
        const token = req.headers.authorization.split(" ")[1];
        

        // Verify the token using jwt.verify
        jwt.verify(token, "secretKey", async (error, verifiedToken) => {
            if (error) {
                // Return 403 if token is invalid
                return res.status(403).json({ message: "Invalid Token" });
            }

            try {
                // Find the user by ID from the verified token payload
                const user = await UserModel.findById(verifiedToken.id);
                
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                // Attach the user data to the request object
                req.user = user;
                next(); // Proceed to the next middleware or route handler
            } catch (err) {
                // Catch any errors while fetching user from DB
                res.status(500).json({ message: err.message });
            }
        });
    } else {
        // Return 401 if token is missing or invalid
        res.status(401).json({ message: "Token not present or invalid" });
    }
}
