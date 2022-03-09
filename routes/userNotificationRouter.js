const userNotificationRouter = require('express').Router()
const userNotificationController = require('../controllers/userNotificationController')
// const {} authen & author

userNotificationRouter.get('/', userNotificationController.getNotifications)
userNotificationRouter.patch('/:id', userNotificationController.updateStatus)
userNotificationRouter.delete('/:id', userNotificationController.deleteNotification)
userNotificationRouter.post('/', userNotificationController.addUserNotification)
module.exports = userNotificationRouter