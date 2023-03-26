import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/auth-routes.js";
import todoRoutes from "./src/routes/todo-routes.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = 8080;
const app = express();

// setup database connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", ()=> console.log("DB Connection Opened"));

app.use(bodyParser.json());

// add routes
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});