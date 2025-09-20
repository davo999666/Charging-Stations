import stationRepo from "../repositories/stationRepository.js";

class StationService {
    async addStation(data) {
        if (!data.name || !data.latitude || !data.longitude) {
            throw new Error("Missing required station fields");
        }
        return stationRepo.create(data);
    }

    async updateStation(id, restData) {
        if (!id || !restData) {
            throw new Error("Station name and update data required");
        }
        // Merge array of objects into one object
        console.log(restData);
        const updates = restData.reduce((acc, item) => ({ ...acc, ...item }), {});
        console.log(updates);
        return await stationRepo.updateById(id, updates);
    }
    async getAllStationsUser() {
        return await stationRepo.findAll();
    }
    async getAllStations() {
        const stations = await stationRepo.findAll();
        return stations.map(station => ({
            name: station.name,
            latitude: station.latitude,
            longitude: station.longitude,
            status: null
        }))
    }
}

export default new StationService(); // ✅ class instance
