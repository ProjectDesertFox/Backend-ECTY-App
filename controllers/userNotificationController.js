const {UserNotification, User} = require('../models')
class userNotificationController {
  static async getNotifications (req, res, next) {
    try {
      let userNotification = await UserNotification.findAll({include: [User], where: {UserId: req.UserId}})
      res.status(200).json(userNotification)
    } catch (err) {
      next(err)
    }
  }
  static async updateStatus (req, res, next) {
    try {
      let {status} = req.body
      const userNotification = await UserNotification.update({status}, {where: {id: +req.params.id}, returning: true, plain:true})
      if(userNotification[0] === 0 ){
        next({status: 404, message: `Notification with id ${req.params.id} not found`})
      }else{
        return res.status(200).json(UserNotification)
      }
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
  static async deleteNotification (req, res, next) {
    try {
      const notification = await UserNotification.destroy({where: {id: req.params.id}})
      if (notification === 0) {
        next({ status: 404, message: `Notification with id ${req.params.id} not found` })
      } else {
          return res.status(200).json(`Notification with id ${req.params.id} deleted`)
      }
    } catch (err) {
      next(err)
    }
  }
  static async addUserNotification (req, res, next) {
    try {
      const {message, type, DataId} = req.body
      const status = 'Active'
      const UserId = req.UserId
      let notification = await UserNotification.create({message, status, type, DataId, UserId})
      res.status(201).json(notification)
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
}

module.exports = userNotificationController