const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please enter your username.']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.'],
        select: false
    },
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    //Encrypt password here
    this.password = await bcrypt.hash(this.password, 10);
    next();

}) 

userSchema.methods.matchPassword = async function(password,userPassword ) {
    return await bcrypt.compare(password,userPassword);  
}



module.exports = mongoose.model ('User', userSchema)