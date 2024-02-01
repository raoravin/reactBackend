import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        required: true,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true});

const Todo = mongoose.model("Todos", TodoSchema);

export default Todo;