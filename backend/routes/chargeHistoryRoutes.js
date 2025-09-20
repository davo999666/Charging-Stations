import express from "express";
import chargeHistoryController from "../controllers/chargeHistoryController.js";
import authentication from "../middleware/authentication.middleware.js";
import authorization from "../middleware/authorization.middleware.js";

const router = express.Router();

router.post("/start",authentication, chargeHistoryController.start);
router.post("/stop",authentication, chargeHistoryController.stop);
router.get("/history",authentication, chargeHistoryController.getHistoryUser);
router.get("/history/station",authentication,authorization.isAdmin('admin'), chargeHistoryController.getHistoryStation);

export default router;
