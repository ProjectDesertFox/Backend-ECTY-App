const groupMessageRouter = require('express').Router()
const groupMessageController = require('../controllers/groupMessageController')
// const {} authen & author

groupMessageRouter.post('/:groupMemberId', groupMessageController.sendMessage)
groupMessageRouter.get('/:groupMemberId', groupMessageController.getAllGroupMemberMessage)

module.exports = groupMessageRouter