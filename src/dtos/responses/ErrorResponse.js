class ErrorResponseBuilder {
    statusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    message(message) {
        this.message = message;
        return this;
    }

    timestamp(timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    build() {
        return new ErrorResponse(this.statusCode, this.message, this.timestamp);
    }
}

class ErrorResponse {
    constructor(statusCode, message = 500, timestamp) {
        this.statusCode = statusCode;
        this.message = message;
        this.timestamp = timestamp;
    }

    static builder() {
        return new ErrorResponseBuilder();
    }
}

module.exports = ErrorResponse;
