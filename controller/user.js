const User = require("../model/User");

const userRegisterCtrl = (async (req, res) => {
   // verificar se já existe
    const userExists = await User.findOne({ email: req?.body?.email });
  
    if (userExists) throw new Error("Usuário já existe");
    try {
      //Registro de usuario
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


  module.exports = {
    
    userRegisterCtrl
  
  };