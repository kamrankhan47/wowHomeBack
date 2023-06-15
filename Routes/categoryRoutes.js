const express = require("express");
const router = express.Router();
const categoryController = require("../Controller/categoryController");


router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.add);
router.delete("/:id", categoryController.deleteById);

module.exports = router;
