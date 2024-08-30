//This code is a middleware function in Node.js, typically used in Express.js applications, 
//to protect routes by ensuring that only authenticated users can access them


import jwt  from "jsonwebtoken"; //used for handling JSON Web Tokens (JWT). JWTs are commonly used for secure authentication.
import userModel from "../models/user.model.js";//This model is used to interact with the user data stored in the database, typically a MongoDB collection.


//Middleware Function
// This is an asynchronous middleware function that will run before the protected route's main handler. 
// It receives the req (request), res (response), and next (next middleware) objects as arguments.
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; //Token Extraction
        //The middleware attempts to retrieve the JWT from a cookie named id. If no token is found,
        // the function returns a 401 Unauthorized status
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        //If a token is found, it is verified using the jwt.verify method with a secret key (JWT_SECRET),
        // which is usually stored in environment variables. If the token is invalid, the function returns a 401 Unauthorized status.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//Token Verification

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });//User Retrieval
        }


        //After successful token verification, the middleware retrieves the user from the database using the userId 
        //extracted from the decoded token. The select("-password") method is used to exclude the password field 
        //from the returned user object for security reasons.
        const user = await userModel.findById(decoded.userId).select("-password");

        if (!user) {//User Check
            return res.status(404).json({ error: "user not found" });//If no user is found in the database,
        }                                                            //the middleware returns a 404 Not Found status.

        //If the user is found, their data (excluding the password) is attached to the req object as req.user. 
        //This allows the subsequent route handlers to access the authenticated user's information.
        req.user = user; //User Attached to Request

        //The next() function is called to pass control to the next middleware or route handler in the stack.
        next();//Proceed to Next Middleware/Route
        //this next function will call the 
    } catch (error) {
        console.log("Error in protectRoute middleware ", error.message);
        res.status(500).json({ error: "Internal server error" })

    }
}


export default protectRoute

//The protectRoute middleware ensures that only authenticated users with valid tokens can access certain routes. 
//It verifies the token, retrieves the user from the database, and attaches the user object to the request before 
//allowing the request to proceed.