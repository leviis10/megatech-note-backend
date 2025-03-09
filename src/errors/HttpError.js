const httpStatusCode = require("../constants/httpStatusCode");

class HttpErrorBuilder {
    timestamp = new Date().toISOString();

    message(message) {
        this.message = message;
        return this;
    }

    statusCode(statusCode) {
        this.statusCode = statusCode
        return this;
    }

    timestamp(timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    build() {
        return new HttpError(this.message, this.statusCode, this.timestamp);
    }
}

class HttpError extends Error {
    constructor(message = "Something went wrong", statusCode = httpStatusCode.INTERNAL_SERVER_ERROR, timestamp) {
        super(message);
        this.statusCode = statusCode;
        this.timestamp = timestamp;
    }

    static builder() {
        return new HttpErrorBuilder();
    }
}

module.exports = HttpError;