import express from "express";
import stationController from "../controllers/stationController.js";

const router = express.Router();


router.post("/add", stationController.addStation);
router.put("/update", stationController.updateStation);
router.get("/all", stationController.getAllStations);

export default router;
