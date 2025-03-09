const CreateTodo = require("../dtos/responses/todoResponse/CreateTodo");
const SuccessResponse = require("../dtos/responses/SuccessResponse");
const todoService = require("../services/todoService");
const catchError = require("../utils/catchError");
const httpStatusCode = require("../constants/httpStatusCode");
const FoundTodo = require("../dtos/responses/todoResponse/FoundTodo");

const create = catchError(async function (req, res) {
    const createdTodo = await todoService.create(req.body);
    const response = CreateTodo.fromEntity(createdTodo);
    res.status(httpStatusCode.CREATED).send(SuccessResponse.builder()
        .message("Todo Created Successfully")
        .statusCode(httpStatusCode.CREATED)
        .data(response)
        .build()
    );
});

const findAll = catchError(async function (req, res) {
    const foundTodos = await todoService.findAll();
    const response = foundTodos.map(todo => FoundTodo.fromEntity(todo));
    res.status(httpStatusCode.OK).send(SuccessResponse.builder()
        .message("Success Fetch all Todo")
        .statusCode(httpStatusCode.OK)
        .data(response)
        .build()
    );
});

const findById = catchError(async function (req, res) {
    const {todoId} = req.params;
    const foundTodo = await todoService.findById(todoId);
    const response = FoundTodo.fromEntity(foundTodo);
    res.status(httpStatusCode.OK).send(SuccessResponse.builder()
        .message("Success fetch todo")
        .statusCode(httpStatusCode.OK)
        .data(response)
        .build()
    );
});

const updateById = catchError(async function (req, res) {
    const {todoId} = req.params;
    await todoService.updateById(todoId, req.body);
    res.status(200).send(SuccessResponse.builder()
        .message("Todo Updated")
        .statusCode(httpStatusCode.OK)
        .data(null)
        .build()
    );
});

const deleteById = catchError(async function(req, res) {
    const {todoId} = req.params;
    await todoService.deleteById(todoId);
    res.status(httpStatusCode.NO_CONTENT).send();
});

module.exports = {
    create,
    findAll,
    findById,
    updateById,
    deleteById,
};
