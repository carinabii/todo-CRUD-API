import mongoose, {Schema} from "mongoose";

const todoSchema = new mongoose.Schema({
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taskName:{
        type: String,
        required: true
    },
    category:{
        type: String
    },
    dueDate:{
        type: Date
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    }

});

export default mongoose.model("Todo", todoSchema);