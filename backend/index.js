const express = require("express");
const connectDB = require("./connection")
const cookiePraser = require("cookie-parser")
const cors = require("cors")

const { MONGO_URL, PORT } = require("./config");

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  credentials: true,  // Allow cookies or credentials to be sent
}));
app.use(express.json())
app.use(cookiePraser())
// app.use(require('./logger'))//for logging

connectDB(MONGO_URL).then(()=>console.log("DataBase connected"))


app.get((req, res) => {return res.status(200).json({message:'Server Running'})});

app.use("/api/users", require("./routes/user"))
app.use('/api/notes',require('./middleware/auth'), require("./routes/notes"))

const server = app.listen(PORT, () => {
  console.log("Server is running");
});

//Handling error
process.on("unhandledRejection",error=>{
  console.log(`An error occurred ${error.message}`)
  server.close(()=>process.exit(1))
});



