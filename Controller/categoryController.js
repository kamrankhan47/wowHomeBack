const category = require("../Models/Category");
const Category = require("../Models/Category");
const Service = require("../Models/Service");
const { validationResult } = require("express-validator");


const getAll = async (req, res) => {
    try {
        const data = await Category.find().populate("service");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getSpecificService = async (req, res) => {
    try {
        const data = await Service.find({ categoryId: req.params.id });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getById = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id).populate("service");
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
        const category = new Category({
            name: req.body.name,
            Image: req.body.Image,
            service: req.body.service,
        });
        const data = await category.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json(err);
    }


}
const deleteById = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

register: async (req, res) => {
    try {
        const { username, password } = req.body;
console.log(req.body);
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({
                success: false,
                errors: { msg: "User already exists" },
            });
        }

        // Create a new user
        const newUser = new User({ username, password });
        // const salt = await bcrypt.genSalt(10);
        // const hash = bcrypt.hash(newUser.password, salt);
        // newUser.password = hash;
        await newUser.save();

        res.json({
            success: true,
            newUser,
        });
    } catch (err) {
        res
            .status(500)
            .json({ success: false, errors: { msg: "Internal Server Error" } });
    }
}

login: async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                success: false,
                errors: { msg: "User not found" },
            });
        }

        // Compare passwords
        if (password !== user.password) {
            return res.json({
                success: false,
                errors: {
                    msg: "Invalid username or password",
                },
            });
        }

        // Generate a token
        let token = jwt.sign({ username: username }, process.env.privateKey, {
            // algorithm:'ES512'
            issuer: "Code Academy",
        });

        // Return the token to the client
        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: { msg: "Internal Server Error", err: err },
        });
    }
},


module.exports = { getAll, getById, add, deleteById,getSpecificService };