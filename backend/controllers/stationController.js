import stationService from "../services/stationService.js";

class StationController {
    async addStation(req, res, next) {
        try {
            const station = await stationService.addStation(req.body);
            res.status(201).json(station);
        } catch (err) {
            next(err);
        }
    }

    async updateStation(req, res, next) {
        try {
            const { id, restData } = req.body;
            const station = await stationService.updateStation(id, restData);

            if (!station) {
                return res.status(404).json({ message: "Station not found" });
            }

            res.json(station);
        } catch (err) {
            next(err);
        }
    }

    async getAllStations(req, res, next) {
        try {
            if (req.principal) {
                const success = await stationService.getAllStationsUser(req, res, next);
                res.status(200).json(success);
            } else {
                const success = await stationService.getAllStations(req, res, next);
                res.status(200).json(success);
            }
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

export default new StationController();
