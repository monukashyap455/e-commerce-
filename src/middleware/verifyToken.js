const jwt = require('jsonwebtoken');
const user = require('../model/user')

const verifyToken = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }
        if (token == null) {
            return res.status(403).json("token is require for this route");
        }
        const verifyUser = jwt.verify(token, "secretKey");

        const userDb = await user.findById({ _id: verifyUser.userDb_id })

        if (!userDb) {
            return res.status(404).json({
                message: "Invalid token please try again later "
            })
        }
        req.user = userDb
        next()
    } catch (error) {
        res.send(error)
    }
}
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log(req.user);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("you are  not allowed in this routes")
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log(req.user);
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("this route only admin access")
        }
    });
};
module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};