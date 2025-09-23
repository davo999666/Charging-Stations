import express from "express";
import userController from "../controllers/userController.js";
import authenticationMiddleware from "../middleware/authentication.middleware.js";
import validation from "../middleware/validation.middleware.js";

const router = express.Router();


router.post('/login',validation('login'), userController.login);
router.post('/verification',validation('verification'), userController.verification)
router.post('/register',validation('register'), userController.register);
router.post('/reset-password/:login', authenticationMiddleware, validation("changePassword"), userController.resetPassword)




export default router;