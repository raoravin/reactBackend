import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import todosRoutes from "./routes/todos.js";
import usersRoutes from "./routes/users.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { MongoClient } from 'mongodb';
dotenv.config();
const app = express();
app.use(cookieParser())


app.use(session({
    name: 'todo',
    secret: process.env.SESS_SECRET,
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,//don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    cookie : {
        maxAge: 1000* 60 * 60 *24 * 365
    },
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');  // Replace with your frontend's origin
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  


app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
}));


connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use("/api/todos", todosRoutes);
app.use("/api/users", usersRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on Port ${process.env.PORT}`);
})
