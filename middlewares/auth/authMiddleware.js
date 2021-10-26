const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../../model/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        //encontraro usuario pelo id
        const user = await User.findById(decoded?.id).select("-password");
        // retornar o usuário
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("não autorizado token expirado, logue novamente");
    }
  } else {
    throw new Error("Acesso não autorizado");
  }
});

module.exports = authMiddleware;