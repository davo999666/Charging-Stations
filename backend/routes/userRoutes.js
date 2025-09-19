import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();


router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/reset-password', userController.resetPassword)




export default router;