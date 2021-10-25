const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
      firstName: {
        required: [true, "Nome é obrigatório"],
        type: String,
      },
      lastName: {
        required: [true, "último nome é obrigatório"],
        type: String,
      },
      profilePhoto: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      email: {
        type: String,
        required: [true, "Email é obrigatório"],
      },
      bio: {
        type: String,
      },
      password: {
        type: String,
        required: [true, "Hei buddy Password é obrigatório"],
      },
      postCount: {
        type: Number,
        default: 0,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        enum: ["Admin", "Guest", "Blogger"],
      },
      isFollowing: {
        type: Boolean,
        default: false,
      },
      isUnFollowing: {
        type: Boolean,
        default: false,
      },
      isAccountVerified: { type: Boolean, default: false },
      accountVerificationToken: String,
      accountVerificationTokenExpires: Date,
  
      viewedBy: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
  
      followers: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
      following: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
      passwordChangeAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
  
      active: {
        type: Boolean,
        default: false,
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
    }
  );


  //Hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;