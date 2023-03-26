import express from "express";
import todoController from "../controller/todo-controller.js";
import middleware from "../middleware/middleware.js";
const router = express.Router();

router.get('/', todoController.getAll);

router.get('/:id', todoController.getTodo);

router.post("/create", todoController.createTodo);

router.patch("/update/:id",
    middleware.isLoggedIn,
    middleware.getTodo,
    todoController.updateTodo)

router.delete("/delete/:id",
    middleware.isLoggedIn,
    middleware.getTodo,
    todoController.deleteTodo);

router.delete('/delete', todoController.deleteAll);

export default router;