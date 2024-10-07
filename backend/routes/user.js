const express = require("express")
const router = express.Router()
const { handleUserSignUp, handleUserSignIn, handleUserDelete, handleUserLogout, handleUserEdit,handleGetUserById } = require("../controller/user")
const auth = require("../middleware/auth")

router.post("/signup",handleUserSignUp)//route for creating new account
router.post("/login",handleUserSignIn)//route for logging in
router.put("/edit",auth, handleUserEdit)//route for editing user details
router.delete("/delete",auth,handleUserDelete)//route by deleting user account
router.get("/getuser",auth,handleGetUserById)//getting specific user details
router.get("/logout",handleUserLogout)//route for logging out

module.exports = router