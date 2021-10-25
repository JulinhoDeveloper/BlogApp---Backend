const express = require("express");
const {
  userRegisterCtrl
} = require("../controller/user");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);




module.exports = userRoutes;