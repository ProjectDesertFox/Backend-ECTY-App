const express = require('express')
const router = express.Router()
const userController = require ('../controllers/userController')
const Itineraries = require('./ItineraryRoute/index.js')
const groupChat = require('./GroupChatRoute')
const friendListRouter = require('./friendListRouter')
const userNotificationRouter = require('./userNotificationRouter')
const itineraryTransportationRouter = require('./itineraryTransporationsRouter')
const itineraryPlacesRouter = require('./itineraryPlacesRouter')
const groupMemberRouter = require('./groupMemberRouter')
const userRoutes = require('./User')
const verificationRoutes = require('./verificationRoute')
const {authentication} = require('../middlewares/auth')


router.post('/register', userController.register)
router.post('/login', userController.login)
// router.post('/itinerary', (req, res, next)=>{
//     console.log(req.body,'=====+++');
//     res.status(200).json('hai')
// })
router.use('/verification', verificationRoutes)
router.use(authentication)
router.use('/itinerary', Itineraries)
router.use('/groupChat', groupChat)
router.use('/friendList', friendListRouter)
router.use('/userNotification', userNotificationRouter)
router.use('/itineraryTransportation', itineraryTransportationRouter)
router.use('/itineraryPlaces', itineraryPlacesRouter)
router.use('/groupMember', groupMemberRouter)
router.use('/users', userRoutes)

module.exports = router