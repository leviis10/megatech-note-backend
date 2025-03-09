class SuccessResponseBuilder {
    message(message) {
        this.message = message;
        return this;
    }

    statusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    data(data) {
        this.data = data;
        return this;
    }

    build() {
        return new SuccessResponse(this.message, this.statusCode, this.data);
    }
}

class SuccessResponse {
    constructor(message, statusCode, data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    static builder() {
        return new SuccessResponseBuilder();
    }
}

module.exports = SuccessResponse;