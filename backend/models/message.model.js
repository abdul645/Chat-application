import mongoose, { Types } from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type:String,
        required: true
    }
}, {timestamps:true}); // when we create message we will have createdAt, updatedAt field 
                         // mongoose will autometically will create these field

const messageModel = mongoose.model("message", messageSchema)


export default messageModel
    