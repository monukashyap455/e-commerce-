const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    firstname: { type: String, required: true, },
    lastname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    birth: { type: Date, required: true },
    mobile: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema)