const HttpError = require("../errors/HttpError");

function catchError(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res);
        } catch (err) {
            next(HttpError.builder()
                .message(err.message)
                .statusCode(err.statusCode)
                .build()
            );
        }
    };
}

module.exports = catchError;
