const express = require('express');
const route = express.Router();
const addressController = require("../controller/address");

route.post('/address', addressController.addAddress)

route.get('/address/:id', addressController.getAddress)

route.put('/address/:id', addressController.updateAddress)

route.delete('/address/:id', addressController.deleteAddress)


module.exports = route;