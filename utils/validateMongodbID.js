const mongoose = require("mongoose");

const validateMongodbId = id => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Usuário não é valido e não encontrado");
};

module.exports = validateMongodbId;