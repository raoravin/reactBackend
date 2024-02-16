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
    completed: {
        type: Boolean,
        required: true,
    },
    important: {
        type: Boolean,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
},{timestamps: true});

const Todo = mongoose.model("Todos", TodoSchema);

export default Todo;