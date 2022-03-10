const jwt = require('jsonwebtoken')
const { User, sequelize, UserVerification } = require('../models')
const { decrypt } = require('../helper/bycrypt')

async function randomEctyId(){
    try {
        const len = 8
        let randomNumber = ''

        for (let i = 0; i < len; i++) {
            const randomId = Math.floor((Math.random() * 10) + 1)
            randomNumber += randomId
        }
        const checkEcty = await User.findOne({ where: { EctyId: randomNumber } })
        console.log(checkEcty);
        if (checkEcty === null) {
            console.log(randomNumber, '========');
            return randomNumber
        } else {
            return randomEctyId()
        }
    } catch (error) {
        return error
    }
}

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
    static async register(req, res, next) {
        // console.log(req.body)
        const { username, email, password } = req.body
        const planStatus = 'Basic'
        let EctyId = await randomEctyId()
        //const t = await sequelize.transaction()
        try {
            const user = await User.create({ username, email, password, planStatus, EctyId })
            const userVerify = await UserVerification.update({UserId:user.id, statusValidEmail:'done'},{where:{UserEmail:user.email}})
            //await t.commit()
            res.status(201).json({user, userVerify})
        } catch (error) {
            //await t.rollback()
            if (error.name === 'SequelizeValidationError') {
                let validation = error.errors.map(el => el.message)
                next({ status: 400, message: validation })
            } else if (error.name === 'SequelizeUniqueConstraintError') {
                let contrainError = error.errors.map(element => element.message)
                next({ status: 400, message: contrainError })
            } else {
                next(error)
            }
        }
        
    }

    static deleteUser(req, res, next) {
        const id = req.params.id
        User.destroy({ where: { id } })
            .then((data) => {
                if (data === 0) {
                    res.status(404).json({
                        message: `data with ${id} not found`
                    })
                } else {
                    res.status(200).json({
                        message: "success delete data"
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }
    static getAllUser(req, res, next) {
        User.findAll()
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json(data)
                } else {
                    next({ status: 404, message: "Not Found Data" })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static getOneUser(req, res, next) {
        const id = req.params.id
        User.findByPk(id)
            .then(data => {
                if (data === null) {
                    res.status(404).json({
                        message: `Data User with id ${id} not found`
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static updateUser(req, res, next) {
        const id = req.params.id
        User.update({phoneNumber, ktp},{where:{id:id}})
        .then(data => {
            if (data[0] === 0) {
                res.status(404).json({
                    message: `User with id ${id} not found`
                })
            } else {
                res.status(201).json({
                    message: `User with id ${id} Updated`
                })
            }
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                res.status(400).json({
                    message: err.message
                })
            } else {
                next(err)
            }
        })
    }
}
