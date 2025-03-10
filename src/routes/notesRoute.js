const express = require("express");

const { create, findAll, findById, updateById, deleteById } = require("../controllers/notesController");

const router = express.Router();

router.route("/")
    .post(create)
    .get(findAll);

router.route("/:noteId")
    .get(findById)
    .put(updateById)
    .delete(deleteById);

module.exports = router;
