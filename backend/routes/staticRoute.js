const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>res.render("home"))
router.get("/register",(req,res)=>res.render("register"))
router.get("/login",(req,res)=>res.render("login"))
router.get("/admin",(req,res)=>res.render("admin"))
router.get("/user",(req,res)=>res.render("user"))
router.get('/logout',(req,res)=>{
    res.cookie('jwt','',{maxAge:'1'})
    res.redirect('/')
})

module.exports = router