const express = require("express");
const router = express.Router();
const categoryController = require("../Controller/categoryController");


router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.add);
router.delete("/:id", categoryController.deleteById);
router.get("/:id/service", categoryController.getSpecificService);

module.exports = router;
