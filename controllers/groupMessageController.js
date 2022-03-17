const {GroupMessage, User, GroupMember} = require('../models')
class groupMessageController {
  static async sendMessage (req, res, next){
    try {
      let GroupMemberId = req.params.groupMemberId
      let message = req.body.message
      let groupMessage = await GroupMessage.create({GroupMemberId, message})
      res.status(201).json(groupMessage)
    } catch (err) {
      console.log(err,'cntrl++++++++++++=');
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