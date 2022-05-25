const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

    userId: { type: String, required: true },
    products: [
        {
            productId: {
                type: "ObjectId"
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
  
    address:{
        type:"ObjectId"
    },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema)