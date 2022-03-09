function errHandler(err, req, res, next) {
    let status = err.status
    let messageErr = err.messageErr || err.message


    if (!status) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            message: messageErr
        })
    } else {
        return res.status(status).json({
            success: false,
            message: messageErr
        })
    }
}

module.exports = errHandler;