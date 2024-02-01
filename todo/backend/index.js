import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import todosRoutes from "./routes/todos.js"
import usersRoutes from "./routes/users.js"
dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use("/api/todos", todosRoutes);
app.use("/api/users", usersRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on Port ${process.env.PORT}`);
})
