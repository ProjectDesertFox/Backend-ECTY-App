const express = require('express')
const router = express.Router()
const {authentication} = require ('../middlewares/auth')
const userController = require ('../controllers/userController')
const userRoutes = require('./User')
const verificationRoutes = require('./verificationRoute')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use('/verification', verificationRoutes)

router.use('/users', userRoutes)

module.exports = router