import chargeHistoryRepo from "../repositories/chargeHistoryRepository.js";

class ChargeHistoryService {
    async startCharging({ login, station_id }) {
        if (!login || !station_id) throw new Error("Login and station_id required");

        return await chargeHistoryRepo.create({
            user_id: login,   // assuming login is primary key in User
            station_id,
            start_time: new Date(),
            end_time: null,
            energy_kwh: 0
        });
    }

    async stopCharging({ login, station_id, energy_kwh = 0 }) {
        const history = await chargeHistoryRepo.findActiveByUserAndStation(login, station_id);
        if (!history) throw new Error("No active charging session found");

        history.end_time = new Date();
        history.energy_kwh = energy_kwh;
        await chargeHistoryRepo.update(history);

        return history;
    }

    async getHistoryByUser(login) {
        return await chargeHistoryRepo.findByUser(login);
    }

    async getHistoryByStation(station_id) {
        return await chargeHistoryRepo.findByStation(station_id);
    }
}

export default new ChargeHistoryService();
