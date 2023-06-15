const express = require("express");
const router = express.Router();
const serviceController = require("../Controller/serviceController");
const { model } = require("mongoose");

router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getById);
router.post("/", serviceController.add);


router.delete("/:id", serviceController.deleteById);


module.exports = router;