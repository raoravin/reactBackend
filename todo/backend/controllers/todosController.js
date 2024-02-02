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
    const { title, description } = req.body;
    try {
        const todo = await Todo.create({
            title,
            description,
            completed: false,
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
            message: "Todo Updated"
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            errors: "Internal Server Eroor"
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