const express = require('express')
const router = express.Router()
const {authentication} = require ('../middlewares/auth')
const userController = require ('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router