const friendListRouter = require('express').Router()
const friendListController = require('../controllers/friendListController')
// const {} authen & author

friendListRouter.get('/', friendListController.getFriendList)
friendListRouter.post('/:friendId', friendListController.addFriend)
friendListRouter.delete('/:id', friendListController.deleteFriend)

module.exports = friendListRouter