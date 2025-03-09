const { Sequelize } = require("sequelize");
const logger = require("pino")();

class DB {
    instance = null;

    static getInstance() {
        if (!this.instance) {
            logger.info("Connecting to the database...");
            this.instance = new Sequelize({
                dialect: "sqlite",
                storage: "./data.sqlite",
                logging: false
            });
            logger.info("Connected to the database");
        }
        return this.instance;
    }
}

module.exports = DB;
