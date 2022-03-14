const verificationController = require ('../controllers/verifyController.js')
const { authentication } = require('../middlewares/auth.js')
const router = require('express').Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const uploadImage = require('../middlewares/image.js')

// Email verification
router.post('/email', verificationController.sendEmailVerification)
router.patch('/email-verification', verificationController.checkEmailVerification)
router.get('/:email', verificationController.getOne)
router.use(authentication)
//router.post('/ktp', upload.single('ktp'), uploadImage, verificationController.sendKTPVerification)


module.exports = router