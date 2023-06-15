const { default: mongoose } = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: String,
    description:String,
    workingDays: String,
    startTime:String,
    location:String,
    price:String,
    image: String,
})
const service = mongoose.model("Service", serviceSchema);
module.exports = service;