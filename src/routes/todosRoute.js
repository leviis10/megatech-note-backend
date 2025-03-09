const express = require("express");

const { create, findAll, findById, updateById, deleteById } = require("../controllers/todosController");

const router = express.Router();

router.route("/")
    .post(create)
    .get(findAll);

router.route("/:todoId")
    .get(findById)
    .put(updateById)
    .delete(deleteById);

module.exports = router;
