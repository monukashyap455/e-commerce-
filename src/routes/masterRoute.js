const express = require('express');
const route = express.Router();


const user = require("./user");
const admin = require("./admin");
const cms = require("./cms");
const product = require("./product");
const cart = require("./cart");
const order = require("./order");
const address = require("./address");


route.use(cms)
route.use(user)
route.use(admin)
route.use(product)
route.use(cart)
route.use(order)
route.use(address)


module.exports = route;