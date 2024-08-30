import bcrypt from "bcryptjs"; //js library (for password hashing)
import userModel from "../models/user.model.js";
import generateTokenSetcookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmpssword, gender } = req.body;
        if (password != confirmpssword) {
            return res.status(400).json({ error: "password don't match" })
        }

        const user = await userModel.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "username already exist" })
        }


        //HASH PASSWORD HERE
        //hiding password when storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //profile avtaar
        //https://avatar-placeholder.iran.liara.run/
        //generate profile pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = userModel({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })

        if (newUser) {
            //generate JWT token here
            //generate token and set it as a cookie
            generateTokenSetcookie(newUser._id, res);
            await newUser.save();


            //save to database
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }

}


export const login = async (req, res) => {
    try {
        
        const {username, password} = req.body; // getting input from users
        const user = await userModel.findOne({username}); // check if user exist or not
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // check if passwpord is correct or not 

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenSetcookie(user._id, res)


        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic:user.profilePic,
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}



export const logout = (req, res) => {

    try {
        
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal server error"})
        
    }
}