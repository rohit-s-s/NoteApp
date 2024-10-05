const mongoose = require("mongoose")

const connectDB = async (MONGO_URL) => {
    await mongoose.connect(MONGO_URL)
}
module.exports = connectDB