const express = require('express');
const route = express.Router();
const userController = require("../controller/user");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");


route.get("/", (req, res) => {
    res.render('index')
})
route.get("/signup", (req, res) => {
    res.render('user');
})
route.post("/signup", userController.userRegister)

route.get("/login", (req, res) => {
    res.render('login');
})
route.post("/login", userController.userLogin)

route.post("/logout", userController.userLogout)

route.put('/:id', verifyTokenAndAuthorization, userController.updateUser)

route.delete('/:id', verifyTokenAndAuthorization, userController.deleteUser)

route.get('/getUser/:id', verifyTokenAndAdmin, userController.getUser)

route.get('/getUsers', verifyTokenAndAdmin, userController.getUsers)

route.get('/stats', verifyTokenAndAdmin, userController.getstats)

route.get('/profile', verifyToken, userController.userProfile)



module.exports = route;