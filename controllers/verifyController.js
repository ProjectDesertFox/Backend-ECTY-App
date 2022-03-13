const { sendMail } = require('../helper/nodemailer')
const { User, UserVerification } = require('../models')

module.exports = class verificationController {
    static sendEmailVerification(req, res, next) {
        const randomNumber = () => {
            const len = 4
            let randNum = ''

            for (let i = 0; i < len; i++) {
                console.log('loop');
                const tempRandomNumber = Math.floor((Math.random() * 9) + 1)
                randNum += tempRandomNumber
            }
            return randNum
        }

        const { UserEmail } = req.body
        let UniqueNumberVerificationEmail = randomNumber()

        UserVerification.create({ UserEmail, UniqueNumberVerificationEmail })
            .then(data => {
                //UserVerification.update({statusValidEmail:'2'}, {where:{UserEmail:data.UserEmail}})
                res.status(201).json({
                    success: true, message: `Success Sent Verification code to ${data.UserEmail}, kindly check your email!!`, data:data
                })
                sendMail(data.UserEmail, 'ECTY Email Verification', `Please insert this number ${data.UniqueNumberVerificationEmail} to continue process verification email to registration`)
            })
            .catch(err => {
                //console.log(err);
                if (err.name === 'SequelizeUniqueConstraintError') {
                    let contrainError = err.errors.map(element => element.message)
                    next({ status: 400, message: contrainError })
                } else {
                    next(err)
                }
            })
    }
    static async checkEmailVerification(req, res, next) {
        try {
            let { UserEmail, UniqueNumberVerificationEmail } = req.body

            let checkUser = await UserVerification.findAll({
                where: {
                    UserEmail: UserEmail,
                    UniqueNumberVerificationEmail: UniqueNumberVerificationEmail
                }
            })
            //console.log(checkUser[0].dataValues, '=======');
            if (checkUser.length !== null) {
                let validEmail = true
                let updateUser = await UserVerification.update({ validEmail, statusValidEmail:'3' }, { where: { id: checkUser[0].dataValues.id } })
                return res.status(201).json({ message: 'Email verification succes', status: updateUser.statusValidEmail })
            } else {
                return res.status(400).json({ message: 'Fail to check Email' })
            }
        } catch (error) {
            console.log(error,'**********************');
            next(error)
        }

    }

}