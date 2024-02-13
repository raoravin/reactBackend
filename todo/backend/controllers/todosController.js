import Todo from "../models/todoSchema.js"


export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user })
        res.status(200).json({
            message: "Todo found", todos
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            errors: "Internal Server Eroor"
        });
    }
};





export const getTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id)
        if (!todo) {
            res.status(404).json({
                message: "Todo not Found"
            });
        }
        if (todo.user.toString() !== req.user) {
            res.status(401).json({
                message: "Not Authorized"
            });
        }

        res.status(200).json({
            message: "Todo Found", todo
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            errors: "Internal Server Eroor"
        });
    }
};





export const createTodo = async (req, res) => {
    const { title, description,completed } = req.body;
    try {
        const todo = await Todo.create({
            title,
            description,
            completed,
            user: req.user
        });

        res.status(200).json({
            message: "Todo created",
            todo
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            errors: "Internal Server Eroor"
        });
    }
}






export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({
                message: "Todo Not Found"
            });
        }

        if (todo.user.toString() !== req.user) {
            return res.status(404).json({
                message: "Not Authorized"
            });
        }

        const updated = 
            {
                title: title,
                description: description,
                completed: completed
            }

        // todo.title = title;
        // todo.description = description;
        // todo.completed = completed;

        // await updated.save();

        const updatedTodo = await Todo.findOneAndUpdate(
            {_id:id},
            {$set:updated},
            { new: true, runValidators: true, context: 'query' },
        )


        res.status(200).json({
            message: "Todo Updated",
            todo:updatedTodo
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            errors: "Internal Server Eroor",
        });
    }
}



export const updateToggle = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo Not Found"
            });
        }

        // Check if the user is authorized to toggle the todo
        if (todo.user.toString() !== req.user.toString()) {
            return res.status(403).json({
                message: "Not Authorized"
            });
        }

        // Toggle the 'completed' field
        todo.completed = !todo.completed;

        // Save the updated todo
        await todo.save();

        res.status(200).json({
            message: "Todo Toggled",
            completed: todo.completed
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: "Internal Server Error"
        });
    }
}





export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({
                message: "todo not found"
            });
        }

        if (todo.user.toString() !== req.user) {
            return res.status(404).json({
                message: "Not Authorized"
            });
        }

        await todo.deleteOne({});
        res.status(200).json({
            message: "Todo Deleted"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            errors: "Internal Server Eroor"
        });
    }

}