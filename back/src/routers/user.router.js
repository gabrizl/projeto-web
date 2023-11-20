const users = require('../models/user')
const router = require("express").Router()

const jwt = require('jsonwebtoken')
const userController = require("../controllers/userController")
const geraToken = require("../middlewares/geraToken")

router.post('/login', userController.login )

router.post('/register',userController.register)

module.exports = router