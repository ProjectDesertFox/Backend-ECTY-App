const {GroupMember, User} = require('../models')
class groupMemberController {
  static async addGroupMember (req, res, next){
    try {
      let groupChatId = req.params.groupChatId
      let UserId = req.UserId
      let groupMember = await GroupMember.create({groupChatId, UserId})
      res.status(201).json(groupMember)
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
  static async getAllMemberGroupChat (req,res,next) {
    try {
      let groupMembers = await GroupMember.findAll({include: [User], where: {id: +req.params.groupChatId}})
      res.status(200).json(groupMembers)
    } catch (err) {
      next(err)
    }
  }
  static async deleteGroupMember (req, res, next) {
    try {
      let groupMember = await GroupMember.destroy({where: {id: req.params.id}})
      if (groupMember === 0) {
        next({ status: 404, message: `Group member with id ${req.params.id} not found` })
      } else {
          return res.status(200).json(`Group member with id ${req.params.id} deleted`)
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = groupMemberController