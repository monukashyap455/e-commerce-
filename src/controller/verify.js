const user = require("../model/register")
const jwt = require("jsonwebtoken");



const registerVerify = async (req, res) => {
    try {
        const TOKEN = req.params.token       //token get for client 
        const verifyToken = jwt.verify(TOKEN, "secretKey")  //token verify
        const userDb = await user.findOne({ _id: verifyToken._id }) // user find with token 
        if (!userDb) {
            return res.status(400).send("Invalid link");
        }
        await user.updateOne({ _id: userDb._id }, { verified: 'true' })  // update the verified
            .then(updated => {
                if (updated.modifiedCount > 0) {
                    res.send({ status: 200, message: "User activated successfully" })
                }
            }).catch(err => {
                res.send(err)
            })
    } catch (error) {
        res.status(400).send(error);
    }
};

const loginVerify = async (req, res) => {
    try {
        let token;
        const otp = req.body.otp
        const loginOtp = await loginUser.findOne({ otp: otp });
        if (!loginOtp) {
            return res.status(400).json("Invalid otp ")
        }
        if (Date.now() > loginOtp.otpExpiresIn) {
            return res.status(400).send("otp expired try again");
        }
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1]
        }
        if (token == null) {
            return res.status(403).json("token is require for this route");
        }
        const tokenVerify = jwt.verify(token, "secretKey")
        if (!tokenVerify) {
            return res.status(400).json("Invalid token please try again ")
        }
        const otpVerify = await loginUser.findOne({ token: token });
        if (!otpVerify) {
            return res.status(400).json("user not found in this token ")
        }
        const userDb = await user.findOne({ _id: otpVerify.login_id });
        if (!userDb) {
            return res.status(400).json("User database not found")
        }
        res.cookie('jwt', otpVerify.token)
        res.status(200).json({
            status: "Success",
            token: otpVerify.token,
        })
    } catch (error) {
        res.send(error)
    }
}

const forgetVerify = async (req, res) => {
    try {
        const token = req.params.token

        const verifyToken = jwt.verify(token, "helloEveryaone")

        const userDB = await user.findOne({ _id: verifyToken.id });
        
        const { oldPassword, password, conformPassword } = req.body
        if (oldPassword < 1) {
            return res.send({ status: 201, message: "Please filled the Old Password" });
        }
        const matchPassword = await bcrypt.compare(oldPassword, userDB.password)
        if (!matchPassword) {
            return res.send({ status: 201, message: " old password are not matched" })
        }
        if (!(password === conformPassword)) {
            return res.send({ status: 201, message: " Conform Password are not match" });
        }
        const bcryptpass = await bcrypt.hash(password, 10)

        const updatePassword = await user.updateOne({ _id: verifyToken.id }, { $set: { password: bcryptpass } })
        return res.send({ status: 200, message: " Password changed success" });

    } catch (error) {
        res.send(error)
    }
}


