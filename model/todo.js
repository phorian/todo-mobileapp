const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const User = require('./user');
const bcrypt = require("bcrypt");



const todoSchema = new Schema ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});



module.exports = mongoose.model ('Todo', todoSchema)