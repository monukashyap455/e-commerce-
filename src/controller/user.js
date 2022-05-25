const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');
const login = require("../model/login");
const resHelped = require("../helper/resHelper");
const lang = require('./../helper/lang')



module.exports.userRegister = async (req, res) => {
    try {
        const { email, password, conformPassword } = req.body

        if (!(validator.isEmail(email))) {
            return res.send("invalid email please try again ");
        };
        if (!conformPassword) {
            return res.status(400).json("conform password are required ")
        }
        if (!(password == conformPassword)) {
            return res.send("password are not match please enter current password ");
        }
        const strongPassword = (validator.isStrongPassword(password, [{
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }]))
        if (!strongPassword) {
            resHelped.successResponse(res,lang.STRONGPASSWORD)
        };
        hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword
        const userDb = user(req.body)

        const saveduser = await userDb.save();
        resHelped.successResponse(res,lang.REGISTERSUCESS)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log(req.body);
        let userDb = await user.findOne({ email: email });
        console.log(userDb);
        // console.log(userDb);
        if (!userDb)
            return res.status(400).json("Email not found please try again ")

        bcrypt.compare(password, userDb.password, async (err, result) => {
            if (!result) {
                return res.status(401).json({ msg: "invalid password please try again " })
            }
        })

        const OTP = Math.floor(1000 + Math.random() * 9000,);
        const otpExpiresIn = Date.now() + 60 * 1000 * 10;

        const token = jwt.sign({ userDb_id: userDb._id }, 'secretKey', { expiresIn: "24h" });

        const loginDb = new login({
            login_id: userDb._id.toString(),
            email: userDb.Email,
            otp: OTP,
            token,
            otpExpiresIn,
        })
        await loginDb.save()
        res.status(200).json({ token, message: "login sucessfull" })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.userLogout = async (req, res) => {
    try {
        const token = req.cookies.jwt
        if (!(token)) {
            return res.send("please login");
        }
        res.clearCookie("jwt")
        res.send("logout success");

    } catch (error) {
        res.send(error)
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error);

    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted ")
    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports.getUser = async (req, res) => {
    try {
        const userDb = await user.findById(req.params.id)
        // console.log(userDb);
        res.status(200).json(userDb)
    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const query = req.query.new
        const allUsers = query ? await user.find().sort({ _id: -1 }).limit(5) : await user.find()
        console.log(allUsers);
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getstats = async (req, res) => {
    const date = new Date();
    // console.log(date);
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
    // console.log(lastyear);
    try {
        const data = await user.aggregate([

            { $match: { createdAt: { $gte: lastyear } } },
            {
                $project: {
                    month: { $month: $createAt },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }

        ])
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports.userProfile = async (req, res) => {
    try {
        const loginUser = req.user
        res.status(400).json(
            {
                "Firstname": loginUser.firstname,
                "Lastname": loginUser.lastname,
                "Mobile": loginUser.mobile,
                "Email": loginUser.email,
            }
        )
    } catch (error) {
        res.send(error)
    }
}

