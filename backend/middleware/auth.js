// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../config");

// exports.adminAuth = (req, res, next) => {
//   const token = req.cookies?.jwt;
//   if (!token) {
//     return res.status(401).json({
//       message: "Not authorised, token not available",
//     });
//   }
//   jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
//     if (err) return res.status(401).json({ message: "Not authorised: Error" });
//     if (decodedToken.role !== "Admin") {
//       return res.status(401).json({ message: "Not authorised: User Not admin" });
//     }
//   });
//   next();
// };

// exports.userAuth = (req, res, next) => {
//   const token = req.cookies?.jwt;
//   if (!token) {
//     return res.status(401).json({
//       message: "Not authorised, token not available",
//     });
//   }
//   jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
//     if (err) return res.status(401).json({ message: "Not authorised: Error" });
//     if (decodedToken.role !== "Basic") {
//       return res.status(401).json({ message: "Not authorised: User not Basic" });
//     }
//   });
//   next();
// };

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const User = require('../model/user')

module.exports = async(req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ message: "Not authorised, token not available" });
    }
    try {
    jwt.verify(token, SECRET_KEY, async(err, decodedToken) => {
      if (err)
        return res.status(401).json({ message: "Not authorised: Error" });
      req.user = await User.findById(decodedToken.id)
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
