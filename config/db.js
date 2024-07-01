const Mongoose = require("mongoose")
const { mountpath } = require("../app")

const connectDB = async () => {
    await Mongoose.connect(process.env.DATABASE_URI)
}

module.exports = connectDB