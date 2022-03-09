const userController = require ('../controllers/userController')
const { authentication } = require('../middlewares/auth')

const router = require('express').Router()

router.use(authentication)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getOneUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router