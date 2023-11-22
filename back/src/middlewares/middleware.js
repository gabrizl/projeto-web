const jwt = require("jsonwebtoken");
const secret = "tokenSecret2023";

const withAuth = function (req, res, next) {
  const token = req.headers.access_token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        req.id = decoded.id;
        next();
      }
    });
  }
};
module.exports = withAuth;
