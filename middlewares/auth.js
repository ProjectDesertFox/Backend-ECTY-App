const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authentication = (req, res, next) => {
    // console.log(req.headers.access_token)
    if (!req.headers.access_token) {
        console.log('MASUK 1')
        next({ status: 401, message: "Missing Access Token" })
    }
    try {
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        req.UserId = decoded.id
        User.findOne({ where: { id: req.UserId } })
            .then((user) => {
                if (user) {
                    next()
                } else {
                    next({ status: 404, message: "Brocken Access Token" })
                }
            })
    }
    catch {
        console.log('MASUK 2')
        next({ status: 401, message: "Access Token not authenticated" })
    }
}


module.exports = { authentication }