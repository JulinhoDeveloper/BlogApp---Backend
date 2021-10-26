const express = require("express");
const {  userRegisterCtrl, loginUserCtrl, fetchUsersCtrl, deleteUsersCtrl } = require("../controller/user");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", fetchUsersCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);


module.exports = userRoutes;