const mongoose = require("../database/connect");

const carSchema = new mongoose.Schema({
    model: String,
    color: String,
    year: String,
    carPlate: String,
    brand: String,
  },{timestamps:true});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;