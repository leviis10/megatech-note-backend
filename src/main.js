if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const compression = require("compression");
const pino = require("pino-http");
const logger = require("pino")();
const notesRoute = require("./routes/notesRoute");
const HttpError = require("./errors/HttpError");
const httpStatusCode = require("./constants/httpStatusCode");
const ErrorResponse = require("./dtos/responses/ErrorResponse");
const DB = require("./db/DB");
const helmet = require("helmet");

const app = express();
const sequelize = DB.getInstance();
const port = process.env.SERVER_PORT;

(async function() {
    try {
        logger.info("Synchronizing database...");
        sequelize.sync();
        logger.info("Database synchronized");
    } catch (err) {
        logger.error(`ERROR: ${err.message}`);
        logger.error(err);
    }
})();

// app configuration
app.disable('x-powered-by');

// middleware
app.use(express.json());
app.use(compression());
app.use(pino());
app.use(helmet());

// routes
app.use("/api/v1/notes", notesRoute);

// error handler
app.all("*", (req, res, next) => {
    next(HttpError.builder()
        .message("Not Found")
        .statusCode(httpStatusCode.NOT_FOUND)
        .build()
    );
});

app.use((err, req, res, next) => {
    req.log.error(`ERROR: ${err.message}`);
    req.log.error(err);
    const statusCode = err.statusCode || httpStatusCode.INTERNAL_SERVER_ERROR;
    const message = err.message || "Something went wrong"
    res.status(err.statusCode).send(ErrorResponse.builder()
        .statusCode(statusCode)
        .message(message)
        .timestamp(err.timestamp)
        .build()
    );
});

app.listen(port, () => {
    logger.info(`Server Listening on :${port}`);
});
