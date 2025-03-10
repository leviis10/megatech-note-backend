const {DataTypes} = require("sequelize");
const DB = require("../db/DB");

const sequelize = DB.getInstance();

const Note = sequelize.define(
    "Note",
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

module.exports = Note;