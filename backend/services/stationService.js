import stationRepo from "../repositories/stationRepository.js";

class StationService {
    async addStation(data) {
        if (!data.name || !data.latitude || !data.longitude) {
            throw new Error("Missing required station fields");
        }
        return stationRepo.create(data);
    }

    async updateStation(name, restData) {
        if (!name || !restData) {
            throw new Error("Station name and update data required");
        }

        // Merge array of objects into one object
        const updates = restData.reduce((acc, item) => ({ ...acc, ...item }), {});
        return await stationRepo.updateByName(name, updates);
    }

    async getAllStations() {
        return await stationRepo.findAll();
    }
}

export default new StationService(); // ✅ class instance
