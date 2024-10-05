const express = require("express");
const connectDB = require("./connection")
const cookiePraser = require("cookie-parser")
const cors = require("cors")
// const morgan = require('morgan');
// const fs = require('fs')
// const path = require('path')
// const {adminAuth,userAuth} = require("./middleware/auth")
const { MONGO_URL, PORT } = require("./config");

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  credentials: true,  // Allow cookies or credentials to be sent
}));
app.use(express.json())
app.use(cookiePraser())
// app.set("view engine", "ejs")
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// // log only 4xx and 5xx responses to console
// app.use(morgan('dev', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))

// // log all requests to access.log
// app.use(morgan('common', {
//   stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// }))

connectDB(MONGO_URL).then(()=>console.log("DataBase connected"))

// app.use("/",require("./routes/staticRoute"))
app.get((req, res) => {return res.status(200).json({message:'Server Running'})});

app.use("/auth", require("./routes/user"))
app.use('/notes',require('./middleware/auth'), require("./routes/notes"))
// app.get('/basic', userAuth, (req,res)=>res.render('user'))
// app.get('/admin', adminAuth, (req,res)=>res.render('admin'))


const server = app.listen(PORT, () => {
  console.log("Server is running");
});

//Handling error
process.on("unhandledRejection",error=>{
  console.log(`An error occurred ${error.message}`)
  server.close(()=>process.exit(1))
});



