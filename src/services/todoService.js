const HttpError = require("../errors/HttpError");
const Todo = require("../models/Todo");
const httpStatusCode = require("../constants/httpStatusCode");

async function create(request) {
    return await Todo.create({
        title: request.title,
        content: request.content 
    });
}

async function findAll() {
    return await Todo.findAll();
}

async function findById(id) {
    const response = await Todo.findByPk(id);

    if (!response) {
        throw HttpError.builder()
            .message("Todo Not Found")
            .statusCode(httpStatusCode.NOT_FOUND)
            .build();
    }

    return response;
}

async function updateById(id, request) {
    const affectedCount = await Todo.update(
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
            .message("Todo not found")
            .statusCode(httpStatusCode.NOT_FOUND)
            .build();
    }
}

async function deleteById(id) {
    await Todo.destroy({
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