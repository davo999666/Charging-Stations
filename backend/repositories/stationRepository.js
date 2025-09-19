import {Station} from "../models/index.js";

class StationRepository {
    async create(stationData) {
        return Station.create(stationData);
    }

    async updateByName(name, updates) {
        const station = await Station.findOne({ where: { name } });
        if (!station) return null;

        await station.update(updates);
        return station;
    }

    async findAll() {
        return await Station.findAll();
    }

    async findById(id) {
        return await Station.findByPk(id);
    }
}

export default new StationRepository();
