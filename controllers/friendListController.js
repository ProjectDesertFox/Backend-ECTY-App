const { User, FriendList } = require('../models')
var { Op } = require('sequelize');

class friendListController {
  static async getFriendList(req, res, next) {
    console.log(typeof req.UserId, 'user--------id');
    try {
      let friendList = await FriendList.findAll({ include: [{ model: User, as: 'User' }], where: { UserId: req.UserId } })
      res.status(200).json(friendList)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  static async addFriend(req, res, next) {
    try {
      const UserId = req.UserId
      const FriendId = +req.params.friendId
      let checkFriend = await FriendList.findAll({ where: { UserId, FriendId } })
      console.log(checkFriend, 'checkFriend=================');
      if (!checkFriend.length > 0) {
        //console.log(checkFriend, 'checkFriend=================if');
        let addFriend = await FriendList.create({ UserId, FriendId })
        return res.status(201).json(addFriend)
      } else {
        //console.log(checkFriend, 'checkFriend=================else');
        return res.status(400).json('User has been added to friend list before')
      }
    } catch (err) {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        //let validation = err.errors.map(el => el.message)
        next({ status: 404, message: 'Friend Id is not found' })
      } else {
        next(err)
      }
    }
  }
  static async deleteFriend(req, res, next) {
    console.log(req.params.id);
    try {
      const deletedFriend = await FriendList.destroy({ where: { id: +req.params.id } })
      if (deletedFriend === 0) {
        next({ status: 404, message: `Friend with id ${req.params.id} not found` })
      } else {
        return res.status(200).json({
          message: `Friend with id ${req.params.id} delete success`
        })
      }
    } catch (err) {
      console.log(err, 'eroor________________');
      next(err)
    }
  }
}

module.exports = friendListController