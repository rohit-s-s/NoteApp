const User = require("../model/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

//register function
exports.handleUserSignUp = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Provide all required feilds",
    });
  }
  const duplicate = await User.findOne({ username }).limit();
  if (duplicate)
    return res.status(400).json({ message: "Username already exist" });

  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should not be less than 6 characters" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: hash,
  });
  return res.status(201).json({ message: "User created successfully" });
});

//login function
exports.handleUserSignIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  //check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Provide all required feilds",
    });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password",
      error: "User not found",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role:user.role
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  return res
    .status(201)
    .json({role:user.role, token });
});


//Edit user details; authorised to users
exports.handleUserEdit = asyncHandler(async (req, res) => {
  const { id,username,password } = req.body;

  if (!username || !password|| !id) {
    return res.status(400).json({
      message: "Provide required feilds",
    });
  }

  //to check for duplicate values entered for username
  const existingUser = await User.findOne({ username });
  if (existingUser && existingUser._id.toString() !== id) {
    return res.status(400).json({ message: "Username already exists" });
  }

  //Checking if user password holds min 6 digits
  if (req.body.password.length < 6)
    return res
      .status(400)
      .json({ message: "Password should not be less than 6 characters" });

    const user = await User.findById(id);
    user.username = username;
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    return res.status(201).json({
     message: "User profile is updated",
  });
});

//deleteing the user
exports.handleUserDelete = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(201).json({
    message: "User data deleted",
  });
});

// //Getting specific user details 
exports.handleGetUserById = asyncHandler(async (req, res) => {
  const {id} = req.user
  const user = await User.findById(id)
  //Before returning user value remember to unhash passwird
  return res.status(200).json(user);
});


//handling refresh tokens
exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ message: "Token not found" });

  jwt.verify(
    token,
    SECRET_KEY,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ message: "Unauthorised User" });
      const newToken = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json(newToken);
    })
  );
});

//logging out user
exports.handleUserLogout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(204).json({ message: "No cookie found" });
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.status(200).json({ message: "Cookies cleared" });
});
