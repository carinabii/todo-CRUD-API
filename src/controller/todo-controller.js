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

async function getTodosByCategory(req, res) {
    if (req.params.completed != 0 && req.params.completed != 1){
        res.status(400).json("Bad input.");
        return;
    }
    let query = {completed:req.params.completed, category: req.params.category};
    try {
        const todo = await Todo.find(query);
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getTodosByDate(req, res) {
    if (!isDate(req.params.startDate) && !isDate(req.params.endDate)){
        res.status(400).json("Bad date format");
        return;
    }
    let query = {dueDate: {$gt: req.params.startDate, $lt: req.params.endDate}};
    try {
        const todo = await Todo.find(query);
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function createTodo(req, res) {
    if (!isDate(req.body.dueDate) && req.body.dueDate !== null && req.body.dueDate !== undefined){
        res.status(400).json("Bad date format.");
        return;
    }

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
    if (req.body.dueDate !== null && req.body.dueDate !== undefined && isDate(req.body.dueDate)){
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

// date checker from https://stackoverflow.com/questions/7445328/check-if-a-string-is-a-date-value
function isDate(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

export default {getAll, createTodo, deleteTodo, updateTodo, getTodo, getTodosByCategory, getTodosByDate};