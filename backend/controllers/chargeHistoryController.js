import chargeHistoryService from "../services/chargeHistoryService.js";
import userService from "../services/userService.js";

class ChargeHistoryController {
    async start(req, res, next) {
        try {
            const history = await chargeHistoryService.startCharging(req.body);
            res.status(201).json(history);
        } catch (err) {
            next(err);
        }
    }

    async stop(req, res, next) {
        try {
            const history = await chargeHistoryService.stopCharging(req.body);
            res.json(history);
        } catch (err) {
            next(err);
        }
    }

    async getHistoryUser(req, res, next) {
        try {
            const { login } = req.query;
            if (!login) {
                return res.status(400).json({ message: "login is required" });
            }
            const history = await chargeHistoryService.getHistoryByUser(login);
            return res.json(history);
        } catch (err) {
            console.error("getHistoryUser error:", err);
            next(err);
        }
    }

    async getHistoryStation(req, res, next) {
        try {
            const { station_id } = req.query; // ✅ get only the value
            if (!station_id) {
                return res.status(400).json({ message: "station_id is required" });
            }
            const history = await chargeHistoryService.getHistoryByStation(station_id);
            return res.json(history);
        } catch (err) {
            console.error("getHistoryStation error:", err);
            next(err);
        }
    }
}

export default new ChargeHistoryController();
