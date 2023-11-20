const mongoose = require("../database/connect");

const clientSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  address: String,
  phoneNumber: String,
  car: Object
},{timestamps:true});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;