import express  from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.listen(process.env.PORT, () => {
    console.log(`server is running on Port ${process.env.PORT}`);
})
 