const express = require('express')
const router = express.Router()
const {authentication} = require ('../middlewares/auth')
const userController = require ('../controllers/userController')
const Itineraries = require('./ItineraryRoute')
const groupChat = require('./GroupChatRoute')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use('/itinerary', Itineraries)
router.use('/groupChat', groupChat)

module.exports = router