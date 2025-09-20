import express from "express";
import stationController from "../controllers/stationController.js";
import authorization from "../middleware/authorization.middleware.js";

const router = express.Router();


router.post("/add",authorization.isAdmin('admin'), stationController.addStation);
router.put("/update",authorization.isAdmin('admin'), stationController.updateStation);
router.get("/all", stationController.getAllStations);

export default router;
