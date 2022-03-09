const ControllerGroupChat = require('../../controllers/GroupChatController')

const groupChat = require('express').Router()

groupChat.post('/', ControllerGroupChat.addChat)
groupChat.get('/:id', ControllerGroupChat.fetchOne)
groupChat.put('/:id', ControllerGroupChat.update)
groupChat.delete('/:id', ControllerGroupChat.delete)

module.exports = groupChat
