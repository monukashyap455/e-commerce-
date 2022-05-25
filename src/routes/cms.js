const route = require("express").Router();
const upload = require("./../middleware/uploads");
const cmsController = require("../controller/cms");



route.post('/cmsCreate', cmsController.cmsCreate)
route.post('/cmsUpdate/:id', cmsController.cmsUpdate)


module.exports = route;