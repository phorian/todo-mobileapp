const Mongoose = require("mongoose")
//const app = require("../app")

const connectDB = async () => {
    await Mongoose.connect(process.env.DATABASE_URI)
}

module.exports = connectDB