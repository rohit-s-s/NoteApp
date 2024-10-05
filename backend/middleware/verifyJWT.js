const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if(!authHeader) return res.json(400).json({message:"Headers not passsed"})
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(400).json({ message: "Unauthorised" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(400).json({ message: "Unauthorized" });
    req.user = decoded.username;
    req.id = decoded.id;
    req.role = decoded.role;
    next()
  });
};

module.exports = verifyJWT;
