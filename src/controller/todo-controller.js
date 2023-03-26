import Todo from "../models/todo.js";

async function getAll(req, res) {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getTodo(req, res) {
    try {
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function createTodo(req, res) {
    try {
        const currentUserID = req.session.userID;
        const todo = new Todo({
            userID: currentUserID,
            taskName: req.body.taskName,
            category: req.body.category,
            dueDate: req.body.dueDate
        });
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function updateTodo(req,res) {
    if (req.body.taskName !== null && req.body.taskName !== undefined){
        res.todo.taskName = req.body.taskName;
    }
    if (req.body.category !== null && req.body.category !== undefined){
        res.todo.category = req.body.category;
    }
    if (req.body.completed !== null && req.body.completed !== undefined){
        res.todo.completed = req.body.completed;
    }
    if (req.body.dueDate !== null && req.body.dueDate !== undefined){
        res.todo.dueDate = req.body.dueDate;
    }

    try {
        const updatedTodo = await res.todo.save();
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function deleteTodo(req,res) {
    try {
        await res.todo.deleteOne();
        res.status(200).json("Successfully deleted.");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function deleteAll(req,res) {
    try {
        const del = await Todo.deleteMany();
        res.status(201).json(del);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export default {getAll, createTodo, deleteTodo, updateTodo,getTodo,deleteAll};