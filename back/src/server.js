//importar express e cors para a aplicação
const express = require("express");
const cors = require("cors");
const connection = require("./database/connect");
const userRouter = require("./routers/user.router");
const clientRouter = require("./routers/client.router");
const serviceRouter = require("./routers/service.router");

const app = express();

//adiciona o cors do frontend
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], //o local varia de acordo de qual link está vindo a requisição
  })
);
app.use(express.json());

//adicionando uma rota
app.use("/api/user", userRouter);
app.use("/api/client", clientRouter);
app.use("/api/service", serviceRouter);

const port = 5000;
app.listen(port, () => {
  console.log("Server iniciado na porta http//:localhost:" + port);
});
