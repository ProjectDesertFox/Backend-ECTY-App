const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { decrypt } = require('../helper/bycrypt')

module.exports = class userController {
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(data => {
                if (data === null) {
                    next({ status: 401, message: "Invalid email/password!" })
                }
                let validate = decrypt(password, data.password)
                if (data && validate) {
                    const access_token = jwt.sign({ id: data.id, username: data.username }, process.env.JWT_SECRET)
                    res.status(200).json({ success: true, message: "login berhasil", access_token });
                } else {
                    next({ status: 401, message: "Invalid email/password!" })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static register (req, res, next){
        const { username, email, password, phoneNumber, role, address } = req.body
        User.create({ username, email, password, phoneNumber, role, address })
            .then(_ => {
                res.status(200).json({
                    success: true, message: 'Register Success'
                })
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let validation = err.errors.map(el => el.message)
                    next({ status: 400, message: validation })
                } else if (err.name === 'SequelizeUniqueConstraintError') {
                    let contrainError = err.errors.map(element => element.message)
                    next({ status: 400, message: contrainError })
                } else {
                    next(err)
                }
            })
    }
}