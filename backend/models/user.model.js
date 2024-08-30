import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true, 
        unique : true
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    gender:{
        type: String,
        required: true,
        enum:["male", "female"]
    },
    profilePic:{
        type: String,
        default:"",
    }
}, {timestamps:true});; // createdAt, updatedAt (eg. member since <createdAt>)

const userModel = mongoose.model('User', userSchema);

export default userModel;