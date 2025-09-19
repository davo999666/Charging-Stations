import express from "express";
import chargeHistoryController from "../controllers/chargeHistoryController.js";

const router = express.Router();

router.post("/start", chargeHistoryController.start);
router.post("/stop", chargeHistoryController.stop);
router.get("/history", chargeHistoryController.getHistory);

export default router;
