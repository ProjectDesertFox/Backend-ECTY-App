const userController = require ('../controllers/userController')

const router = require('express').Router()


router.get('/', userController.getAllUser)
router.patch('/', userController)
router.get('/:id', userController.getOneUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)


module.exports = router