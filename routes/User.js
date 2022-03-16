const userController = require ('../controllers/userController')

const router = require('express').Router()


router.get('/', userController.getAllUser)
router.get('/userCurrent', userController.getOneUser)
router.get('/findEctyId/:ectyId', userController.getSearchEctyId)
router.get('/:id', userController.fetchOneUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)


module.exports = router