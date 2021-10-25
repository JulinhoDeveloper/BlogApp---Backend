const User = require("../model/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../configToken/token");

//-------------------------------------
//Registro
//-------------------------------------

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
    //Check if user Exist
    const userExists = await User.findOne({ email: req?.body?.email });
  
    if (userExists) throw new Error("Usuário já existe");
    try {
      //Register user
      const user = await User.create({
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        password: req?.body?.password,
      });
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  });
  
//-------------------------------
//Login user
//-------------------------------

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
   const { email, password} = req.body;
    //check se usuário existe
    const userFound = await User.findOne({ email });
    //Check se a senha confere
    if (userFound && (await userFound.isPasswordMatched(password))) {
      res.json({
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id)
        });
    } else {
      res.status(401);
      throw new Error("Email ou senha inválidos");
    }
  });
  module.exports = {
    
    userRegisterCtrl,
    loginUserCtrl
  
  };