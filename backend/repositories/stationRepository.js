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

    async findById(id) {
        return await Station.findByPk(id);
    }
    async deleteById(id) {
        return await Station.destroy({ where: { id } });
    }
}

export default new StationRepository();
