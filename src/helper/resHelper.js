module.exports.successResponse = (res, msg) => {
    data = {
        status: true,
        message: msg
    }
    return res.status(200).json(data)
},

module.exports.successDataResponse = (res, data) => {
        data = {
            status: true,
            message: msg
        }
        return res.status(200).json(data)
    }

