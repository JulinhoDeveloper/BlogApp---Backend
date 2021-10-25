const express = require("express");
const {  userRegisterCtrl, loginUserCtrl } = require("../controller/user");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);



module.exports = userRoutes;