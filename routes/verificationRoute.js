const verificationController = require ('../controllers/verifyController.js')
const router = require('express').Router()

// Email verification
router.post('/email', verificationController.sendEmailVerification)
router.patch('/email-verification', verificationController.checkEmailVerification)

module.exports = router