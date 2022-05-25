const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({

    house_no: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pin_code: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('address', addressSchema)