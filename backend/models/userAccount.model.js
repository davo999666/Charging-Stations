import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
    login: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
        allowNull: false,
    },
}, {
    tableName: "users",
    underscored: true,
    timestamps: true,
});

export default User;
