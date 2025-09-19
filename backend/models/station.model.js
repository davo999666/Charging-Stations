import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Station = sequelize.define("Station", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.ENUM("fast", "slow"), allowNull: false },
    status: { type: DataTypes.ENUM("free", "occupied"), defaultValue: "free" },
    price_per_kwh: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
    tableName: "stations",
    underscored: true,
    timestamps: true,
});

export default Station;
