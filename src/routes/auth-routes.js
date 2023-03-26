import express from "express";
import authController from "../controller/auth-controller.js";
const router = express.Router();

router.get('/',authController.getAll);

router.post('/createUser', authController.createUser);

router.post('/login', authController.login);

router.delete('/delete', authController.deleteAll);

export default router;