const mongoose = require("../database/connect");

const serviceSchema = new mongoose.Schema({
  id: String,
  client: String,
  car: String,
  price: Number,
  description: String,
  status: String,
},{timestamps:true});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;