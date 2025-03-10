const CreateNote = require("../dtos/responses/noteResponse/CreateNote");
const SuccessResponse = require("../dtos/responses/SuccessResponse");
const noteService = require("../services/noteService");
const catchError = require("../utils/catchError");
const httpStatusCode = require("../constants/httpStatusCode");
const FoundNote = require("../dtos/responses/noteResponse/FoundNote");

const create = catchError(async function (req, res) {
    const createdNote = await noteService.create(req.body);
    const response = CreateNote.fromEntity(createdNote);
    res.status(httpStatusCode.CREATED).send(SuccessResponse.builder()
        .message("Note Created Successfully")
        .statusCode(httpStatusCode.CREATED)
        .data(response)
        .build()
    );
});

const findAll = catchError(async function (req, res) {
    const foundNotes = await noteService.findAll();
    const response = foundNotes.map(note => FoundNote.fromEntity(note));
    res.status(httpStatusCode.OK).send(SuccessResponse.builder()
        .message("Success Fetch all Note")
        .statusCode(httpStatusCode.OK)
        .data(response)
        .build()
    );
});

const findById = catchError(async function (req, res) {
    const {noteId} = req.params;
    const foundNote = await noteService.findById(noteId);
    const response = FoundNote.fromEntity(foundNote);
    res.status(httpStatusCode.OK).send(SuccessResponse.builder()
        .message("Success fetch note")
        .statusCode(httpStatusCode.OK)
        .data(response)
        .build()
    );
});

const updateById = catchError(async function (req, res) {
    const {noteId} = req.params;
    await noteService.updateById(noteId, req.body);
    res.status(200).send(SuccessResponse.builder()
        .message("Note Updated")
        .statusCode(httpStatusCode.OK)
        .data(null)
        .build()
    );
});

const deleteById = catchError(async function(req, res) {
    const {noteId} = req.params;
    await noteService.deleteById(noteId);
    res.status(httpStatusCode.NO_CONTENT).send();
});

module.exports = {
    create,
    findAll,
    findById,
    updateById,
    deleteById,
};
