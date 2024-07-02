const express = require("express")
const router = express.Router()

const todoController = require("../controllers/todoController");


router.route('/addtask').post(todoController.createTask);
