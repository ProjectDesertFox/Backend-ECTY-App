const {GroupMessage, User, GroupMember} = require('../models')
class groupMessageController {
  static async sendMessage (req, res, next){
    try {
      let groupMemberId = req.params.groupMemberId
      let message = req.body.message
      let groupMessage = await GroupMessage.create({groupMemberId, message})
      res.status(201).json(groupMessage)
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
  static async getAllGroupMemberMessage (req,res,next) {
    try {
      let groupMessages = await GroupMessage.findAll({include: [GroupMember], where: {GroupMemberId: +req.params.groupMemberId}})
      res.status(200).json(groupMessages)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = groupMessageController