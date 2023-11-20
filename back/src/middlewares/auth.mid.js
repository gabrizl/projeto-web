
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const token = req.headers.access_token;
    if(!token) return res.status(402).send();
    try {
        const decodedUser = jwt.verify(token, "tokenSecret2023");
        req.user = decodedUser;

    } catch (error) {
        console.log("unaltorized")
        res.status(402).send("Sem autorizacao");
    }

    return next();
}