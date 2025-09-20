import {Station} from "../models/index.js";

class StationRepository {
    async create(stationData) {
        return Station.create(stationData);
    }

    async updateById(id, updates) {
        const station = await Station.findByPk(id);
        if (!station) return null;
        await station.update(updates);
        return station;
    }

    async findAll() {
        return await Station.findAll();
    }

    async find(id) {
        return await Station.findAll();
    }
}

export default new StationRepository();
