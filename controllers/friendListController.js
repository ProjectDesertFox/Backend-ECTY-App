const {FriendList} = require('../models')
class friendListController {
  static async getFriendList (req, res, next) {
    try {
      let friendList = await FriendList.findAll({include: [User], where: {UserId: req.UserId}})
      res.status(200).json(friendList)
    } catch (err) {
      next(err)
    }
  }
  static async addFriend (req, res, next) {
    try {
      const UserId = req.UserId
      const FriendId = req.params.ectyId
      let addFriend = await FriendList.create({UserId, FriendId})
      res.status(201).json(addFriend)
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
  static async deleteFriend (req, res, next) {
    try {
      const deletedFriend = await FriendList.destroy({where: {id: req.params.id}})
      if(deletedFriend === 0){
        next({status: 404, message: `Friend with id ${req.params.id} not found`})
      }else{
        return res.status(200).json({
          message: `Friend with id ${req.paramas.id} delete success`
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = friendListController