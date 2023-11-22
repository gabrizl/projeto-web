const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://gabrielcosta:uTwjH15vz3HLmxxR@cluster0.phs4xvi.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na conexão ao MongoDB:"));
db.once("open", () => {
  console.log("Conectado ao MongoDB!");
});

module.exports = mongoose;
//`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.phs4xvi.mongodb.net/?retryWrites=true&w=majority`
