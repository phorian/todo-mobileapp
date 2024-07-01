const User = require('../model/user');
const jwt = require('jsonwebtoken');


const signToken = id => {

    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,
       {
           expiresIn: process.env.JWT_EXP
       })
}


exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({'message': 'Input all fields'})
    }

    if (password.length < 6) {
        return res.status(400).json({message: "Password less than 6 characters"})
    }

    try {
        const newUser = await User.create(
            req.body
        );

        const accessToken = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            accessToken,
            data: {
                newUser,
            },
        });
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}



exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({'message': 'Input all fields'})
    }

    const searchUser = await User.findOne({username}).select('+password');
    if(!searchUser){
        return res.status(400).json({
            status: false,
            message: 'User does not exist'
        })
    }

    const matchpwd = await searchUser.matchpassword(password, searchUser.password)
    if(matchpwd) {
        const accessToken = signToken(searchUser._id);

    const result = await searchUser.save();

    return res.status(200).json({
        status: 'success',
        accessToken,
        message: 'You are logged in',
        data: {
            result
        }
    })
}else {
    return res.status(403).json({
        message: "Incorrect password."
    });
}
}