const {DataTypes} = require("sequelize");
const DB = require("../db/DB");

const sequelize = DB.getInstance();

const Todo = sequelize.define(
    "Todo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
        }
    },
    {
        timestamps: true
    }
);

module.exports = Todo;