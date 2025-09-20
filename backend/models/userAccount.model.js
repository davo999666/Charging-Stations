import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const User = sequelize.define(
    "User",
    {
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
    },
    {
        tableName: "users",
        underscored: true,
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ["password_hash"] }, // hide by default
        },
        scopes: {
            withPassword: {
                attributes: {}, // include all fields
            },
        },
    }
);

// 👇 Add instance method for password validation
User.prototype.validatePassword = async function (password) {
    if (!password) throw new Error("Password is required");
    return bcrypt.compare(password, this.getDataValue("password_hash"));
};

// 👇 Safety net: remove hash when converting to JSON
User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password_hash;
    return values;
};

export default User;
