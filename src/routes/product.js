const express = require('express');
const route = express.Router();
const productController = require('../controller/product');
const upload = require("../middleware/uploads")

route.post('/product', upload, productController.productAdd);

route.put('/Product/:id', productController.updateProduct)

route.get('/Product/:id', productController.getProduct)

route.get('/Products', productController.getAllProducts)

route.delete('/Products', productController.deleteProducts)


module.exports = route;