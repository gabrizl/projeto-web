const userModel = require("../models/user");
const geraToken = require("../middlewares/geraToken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userExist = await userModel.findOne({ email: email });

  if (userExist) {
    res.status(400).json("Usuario já existe, vá para o login!");
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new userModel({
    email: email,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();

    await geraToken(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (!user) {
    res.status(404).json("Usuário não cadastrado");
  }
  //faz a comparação com a propria criptografia salva
  if (await bcrypt.compare(password, user.password)) {
    res.send(geraToken(user));
  } else {
    console.log("erro");
    res.status(400).send("email e senha nao encontrados!");
  }
};

// Controlador para listar todos os clientes
const authUser = async (req, res) => {
  try {
    const clients = await client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os clientes" });
  }
};

module.exports = {
  register,
  authUser,
  login,
};
