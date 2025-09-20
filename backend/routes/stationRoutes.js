import express from "express";
import stationController from "../controllers/stationController.js";
import authorization from "../middleware/authorization.middleware.js";
import authentication from "../middleware/authentication.middleware.js";
import {optionalBasicAuth} from "../middleware/optionalBasicAuth.js";

const router = express.Router();


router.post("/add",authentication, authorization.isAdmin('admin'), stationController.addStation);
router.put("/update",authentication, authorization.isAdmin('admin'), stationController.updateStation);
router.get("/all",optionalBasicAuth, stationController.getAllStations);


export default router;
