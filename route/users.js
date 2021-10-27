const express = require("express");
const {  userRegisterCtrl, loginUserCtrl, fetchUsersCtrl, deleteUsersCtrl,
    fetchUserDetailsCtrl, userProfileCtrl,updateUserCtrl,
    updateUserPasswordCtrl,followingUserCtrl, unfollowUserCtrl,
    blockUserCtrl,
    unBlockUserCtrl } = require("../controller/user");
    const authMiddleware = require("../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", authMiddleware, fetchUsersCtrl);
userRoutes.get("/profile/:id",authMiddleware, userProfileCtrl);
userRoutes.put("/", authMiddleware, updateUserCtrl);
userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.put("/follow", authMiddleware, followingUserCtrl);
userRoutes.put("/unfollow", authMiddleware, unfollowUserCtrl);
userRoutes.put("/block-user/:id", authMiddleware, blockUserCtrl);
userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUserCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);




module.exports = userRoutes;