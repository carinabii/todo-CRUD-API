import mongoose from "mongoose";
// import autoIncrementModel from "./counter.js";

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    dateAdded:{
        type: Date,
        required: true,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }

})

// userSchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }
//     autoIncrementModel('activities', this, next);
// });

let user = mongoose.model("User", userSchema);
export default user;

