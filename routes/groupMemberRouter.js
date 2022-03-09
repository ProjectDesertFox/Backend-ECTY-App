const groupMemberRouter = require('express').Router()
const groupMemberController = require('../controllers/groupMemberController')
// const {} authen & author

groupMemberRouter.post('/:groupChatId', groupMemberController.addGroupMember)
groupMemberRouter.get('/:groupChatId', groupMemberController.getAllMemberGroupChat)
groupMemberRouter.delete('/:id', groupMemberController.deleteGroupMember)

module.exports = groupMemberRouter