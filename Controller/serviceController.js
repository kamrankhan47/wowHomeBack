const Service = require("../Models/Service");
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
    try {
        const data = await Service.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getById = async (req, res) => {
    try {
        const data = await Service.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

const add = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()})
        }
        const service = new Service({
            name: req.body.name,
            description: req.body.description,
            workingDays: req.body.workingDays,
            startTime: req.body.startTime,
            location: req.body.location,
            price: req.body.price,
            image: req.body.image,
        });
        const data = await service.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

const deleteById = async (req, res) => {
    try {
        const data = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}
module.exports = { getAll, getById, add, deleteById };