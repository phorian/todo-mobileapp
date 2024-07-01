const express = require("express")
const router = express.Router()

const authCotroller = require("../controllers/authcontroller");


router.route('/signup').post(authCotroller.createUser);
router.route('/login').post(authCotroller.loginUser);