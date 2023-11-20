const jwt = require("jsonwebtoken");

const gerarToken = (user)=>{
    const token = jwt.sign({
        nome: user.nome,
        id: user.id
    },
     "tokenSecret2023",
    {expiresIn: "30d"}
    )

    return token
}

module.exports = gerarToken;