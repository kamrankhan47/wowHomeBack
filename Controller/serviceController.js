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
            categoryId: req.body.categoryId,
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

const updateById = async (req, res) => {
    try{
        let service = await Service.findById(req.params.id);
        service.name = req.body.name;
        service.description = req.body.description;
        service.workingDays = req.body.workingDays;
        service.startTime = req.body.startTime;
        service.location = req.body.location;
        service.price = req.body.price;
        service.image = req.body.image;
        service.categoryId = req.body.categoryId;
        service.save();
        res.status(200).json(service);

    }
    catch{
        res.status(400).json(err);

    }
}


module.exports = { getAll, getById, add, deleteById ,updateById};