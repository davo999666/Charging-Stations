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
            const { name, restData } = req.body;
            const station = await stationService.updateStation(name, restData);

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
            const stations = await stationService.getAllStations();
            res.json(stations);
        } catch (err) {
            next(err);
        }
    }
}

export default new StationController();
