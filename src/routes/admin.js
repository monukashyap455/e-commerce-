const express = require('express');
const route = express.Router();
const overview = require('../controller/overview')



route.get("/dashboard", (req, res) => {
    res.render('admin')
})

module.exports = route;