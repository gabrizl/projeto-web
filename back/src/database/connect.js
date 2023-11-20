/*const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.phs4xvi.mongodb.net/?retryWrites=true&w=majority`,
    (error) => {
      if (error) {
        console.log(
          "Ocorreu um erro ao se conectar com o banco de dados: ",
          error
        );
      }

      return console.log("Conexao com banco de dados realizada com sucesso!");
    }
  );
};

module.exports = connectToDatabase;*/
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://gabrielcosta:uTwjH15vz3HLmxxR@cluster0.phs4xvi.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão ao MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB!');
});

module.exports = mongoose;
//`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.phs4xvi.mongodb.net/?retryWrites=true&w=majority`