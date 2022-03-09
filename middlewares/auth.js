const jwt = require('jsonwebtoken')
const {User} = require('../models')

const authentication = (req, res, next) => {
    if (!req.headers.access_token) {
        next({
            status: 401,
            message: "Missing Access Token"
        })
    }
    try {
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET);
        User.findByPk(decoded.id)
            .then((user) => {
                if (user) {
                    req.UserId = user.id
                    next()
                } else {
                    next({ status: 404, message: "Broken Access Token" })
                }
            })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {authentication}