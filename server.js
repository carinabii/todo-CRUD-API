import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/auth-routes.js";
import todoRoutes from "./src/routes/todo-routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));


// setup database connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", ()=> console.log("DB Connection Opened"));

// add routes
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT}`);
});