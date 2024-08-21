import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"Please provide a username"],
        unique:true
    },
    email:{
        type:String,
        required: [true,"Please provide an email"],
        unique:true
    },
    password:{
        type:String,
        required: [true,"Please provide a password"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordTokenExpiry:{
        type:String
    },
    verificationToken:{
        type:String
    },
    verificationTokenExpiry:{
        type:String
    },
})
const User = mongoose.model.users || mongoose.model("users",UserSchema);
export default User;