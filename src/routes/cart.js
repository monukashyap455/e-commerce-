const express = require('express');
const route = express.Router();
const cartController = require("../controller/cart");

route.post('/cart', cartController.addCart)

route.put('/cart/:id', cartController.updateCart)

route.delete('/cart', cartController.deleteCart)

route.get('/cart/:userId', cartController.getCart)

route.get('/carts', cartController.getCarts)

module.exports = route;