import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    dateAdded:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

let user = mongoose.model("User", userSchema);
export default user;

