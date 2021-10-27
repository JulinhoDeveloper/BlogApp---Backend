const User = require("../model/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../configToken/token");
const validateMongodbId = require("../utils/validateMongodbID");

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
        _id: userFound?._id,
        firstName: userFound?.firstName,
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

//------------------------------
//Users
//-------------------------------
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
 
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Delete user
//------------------------------
const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //checar se o id é válido
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

//----------------
//detalhes de usuário
//----------------
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //checar se o usuário é válido
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//perfil do usuário
//------------------------------
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const myProfile = await User.findById(id);
      res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//atualizar perfil
//------------------------------
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;

  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//------------------------------
//atualizar senha
//------------------------------

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  // desestruturando o user id
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  //Encontrando o usuário pelo id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

  module.exports = {
    userRegisterCtrl,
    loginUserCtrl,
    fetchUsersCtrl,
    deleteUsersCtrl,
    fetchUserDetailsCtrl,
    userProfileCtrl,
    updateUserCtrl,
    updateUserPasswordCtrl
  };