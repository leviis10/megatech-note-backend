const HttpError = require("../errors/HttpError");
const Note = require("../models/Note");
const httpStatusCode = require("../constants/httpStatusCode");

async function create(request) {
    return await Note.create({
        title: request.title,
        content: request.content 
    });
}

async function findAll() {
    return await Note.findAll();
}

async function findById(id) {
    const response = await Note.findByPk(id);

    if (!response) {
        throw HttpError.builder()
            .message("Note Not Found")
            .statusCode(httpStatusCode.NOT_FOUND)
            .build();
    }

    return response;
}

async function updateById(id, request) {
    const affectedCount = await Note.update(
        { 
            title: request.title,
            content: request.content
        },
        {
            where: {
                id
            }
        }
    );
    if (!affectedCount) {
        throw HttpError.builder()
            .message("Note not found")
            .statusCode(httpStatusCode.NOT_FOUND)
            .build();
    }
}

async function deleteById(id) {
    await Note.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    create,
    findAll,
    findById,
    updateById,
    deleteById
}