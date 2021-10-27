const express = require("express");
const {  userRegisterCtrl, loginUserCtrl, fetchUsersCtrl, deleteUsersCtrl,
    fetchUserDetailsCtrl, userProfileCtrl,updateUserCtrl,
    updateUserPasswordCtrl } = require("../controller/user");
    const authMiddleware = require("../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", authMiddleware, fetchUsersCtrl);
userRoutes.get("/profile/:id",authMiddleware, userProfileCtrl);
userRoutes.put("/", authMiddleware, updateUserCtrl);
userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);


module.exports = userRoutes;