const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  Image: String,
  service:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  }],
  categoryId:mongoose.Schema.Types.ObjectId,
});
const category = mongoose.model("Category", categorySchema);
module.exports = category;
