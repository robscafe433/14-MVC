// models/User.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection"); // Ensure this path is correct

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "user",
    }
);

module.exports = User;
