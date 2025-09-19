import chargeHistoryService from "../services/chargeHistoryService.js";

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

    async getHistory(req, res, next) {
        try {
            const { login, station_id } = req.query;

            let history;
            if (login) {
                history = await chargeHistoryService.getHistoryByUser(login);
            } else if (station_id) {
                history = await chargeHistoryService.getHistoryByStation(station_id);
            } else {
                return res.status(400).json({ message: "Provide login or station_id" });
            }

            res.json(history);
        } catch (err) {
            next(err);
        }
    }
}

export default new ChargeHistoryController();
