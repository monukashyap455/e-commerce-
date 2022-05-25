const mongoose = require("mongoose");
const ip = require("ip");

const userlogin = new mongoose.Schema({
    login_id: {
        type: 'ObjectId',
    },
    email: {
        type: String,
    },
    token: {
        type: String,
    },
    ip: {
        type: String,
        default: ip.address()
    },
    otp: {
        type: Number,
    },
    otpExpiresIn: {
        type: Date
    },

    createat: {
        type: Date,
        default: Date.now
    },
});
module.exports = new mongoose.model("login", userlogin);