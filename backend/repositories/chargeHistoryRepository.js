import {ChargeHistory, Station, User} from "../models/index.js";

class ChargeHistoryRepository {
    async create(startData) {
        return ChargeHistory.create(startData);
    }

    async findActiveByUserAndStation(login, station_id) {
        return await ChargeHistory.findOne({
            include: [
                {
                    model: User,
                    where: { login },
                }
            ],
            where: { station_id, end_time: null }
        });
    }

    async update(history) {
        return await history.save();
    }

    async findByUser(login) {
        return await ChargeHistory.findAll({
            include: [{model: User, where: { login },}, Station]
        });
    }

    async findByStation(station_id) {
        return await ChargeHistory.findAll({
            include: [User, { model: Station, where: { id: station_id } }]
        });
    }
}

export default new ChargeHistoryRepository();
