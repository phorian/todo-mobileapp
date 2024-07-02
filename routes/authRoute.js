const express = require("express")
const router = express.Router()

const authController = require("../controllers/authcontroller");


router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);