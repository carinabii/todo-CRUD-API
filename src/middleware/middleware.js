import Todo from "../models/todo.js";

async function getTodo(req,res,next){
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        const currUserID = req.session.userID;
        if (todo === null){
            res.status(404).json("Todo not found.");
        } else {
            if (todo.userID !== null && currUserID !== null && currUserID.toString() === todo.userID.toString()){
                res.todo = todo;
                next();
            } else {
                res.status(401).json("Not authorized to modify this todo.");
            }

        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

function isLoggedIn(req,res,next){
    if (!req.session.loggedIn){
        res.status(401).json("Not logged in.");
    } else {
        next();
    }
}

export default {getTodo, isLoggedIn};