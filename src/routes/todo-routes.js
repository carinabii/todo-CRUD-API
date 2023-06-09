import express from "express";
import todoController from "../controller/todo-controller.js";
import middleware from "../middleware/middleware.js";
const router = express.Router();

router.get("/", todoController.getAll);
router.get("/:id", todoController.getTodo);
router.get("/get-by-category/:completed/:category", todoController.getTodosByCategory);
router.get("/get-by-date/:startDate/:endDate", todoController.getTodosByDate);

router.post("/create",
    middleware.isLoggedIn,
    todoController.createTodo);

router.patch("/update/:id",
    middleware.isLoggedIn,
    middleware.getTodo,
    todoController.updateTodo)

router.delete("/delete/:id",
    middleware.isLoggedIn,
    middleware.getTodo,
    todoController.deleteTodo);

export default router;