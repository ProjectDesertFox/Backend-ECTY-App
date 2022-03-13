const {User,FriendList} = require('../models')
class friendListController {
  static async getFriendList (req, res, next) {
    console.log(typeof req.UserId,'user--------id');
    try {
      let friendList = await FriendList.findAll({include:[{model:User , as: 'User'}], where:{UserId:req.UserId}})
      res.status(200).json(friendList)
    } catch (err) {
      console.log(err);
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
      console.log(err, '==============');
      if(err.name === 'SequelizeForeignKeyConstraintError') {
        //let validation = err.errors.map(el => el.message)
        next({ status: 404, message: 'Friend Id is not found' })
      }else{
        next(err)
      }
    }
  }
  static async deleteFriend (req, res, next) {
    console.log(req.params.id);
    try {
      const deletedFriend = await FriendList.destroy({where: {id: req.params.id}})
      if(deletedFriend === 0){
        next({status: 404, message: `Friend with id ${req.params.id} not found`})
      }else{
        console.log('bisa hapus');
        return res.status(200).json({
          message: `Friend with id ${req.params.id} delete success`
        })
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = friendListController