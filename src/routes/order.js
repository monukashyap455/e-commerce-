const express = require('express');
const route = express.Router();
const orderController = require("../controller/order");


route.post('/Order', orderController.addOrder)

route.put('/order/:id', orderController.updateOrder)

route.delete('/order/:id', orderController.deleteOrder)

route.get('/order/:userId', orderController.getOrder)

route.get('/orders', orderController.getOrders)

route.post('/orderDeliver', orderController.orderDeliver)

route.post('/income', orderController.getIncome)


module.exports = route;