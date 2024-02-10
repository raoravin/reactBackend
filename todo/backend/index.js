import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import todosRoutes from "./routes/todos.js";
import usersRoutes from "./routes/users.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
}));

// Enable CORS for all routes
// app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use("/api/todos", todosRoutes);
app.use("/api/users", usersRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on Port ${process.env.PORT}`);
})
