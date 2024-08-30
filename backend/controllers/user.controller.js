import userModel from "../models/user.model.js";


export const getUserForSidebar = async (req, res)=> {
    try {

        //get currently authenticated user id
        const loggedInUserId = req.user._id;//The loggedInUserId is extracted from the req.user object, which contains the 
        //authenticated user's information

        //fetch all user from DB except current user(means itself)
        const filteredUsers = await userModel.find({_id:{ $ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.log("Error in getUserForSidebar :", error.message);
        res.status(500).json({error: "Internal server error"}) 
    }
}