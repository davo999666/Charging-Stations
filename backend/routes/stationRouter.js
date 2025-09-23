import express from "express";
import stationController from "../controllers/stationController.js";
import authorization from "../middleware/authorization.middleware.js";
import authentication from "../middleware/authentication.middleware.js";
import {optionalBasicAuth} from "../middleware/optionalBasicAuth.js";

const router = express.Router();

router.get("/all",optionalBasicAuth, stationController.getAllStations);
router.get("/:id", authentication, stationController.getStationById);
router.post("/add",authentication, authorization.isAdmin('admin'), stationController.addStation);
router.put("/update/:id",authentication, authorization.isAdmin('admin'), stationController.updateStation);
router.delete("/delete/:id",authentication,authorization.isAdmin('admin'), stationController.deleteStation )


export default router;
