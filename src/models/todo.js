import mongoose, {Schema} from "mongoose";

const todoSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
        required: true
    },
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
        default: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }

});

export default mongoose.model("Todo", todoSchema);