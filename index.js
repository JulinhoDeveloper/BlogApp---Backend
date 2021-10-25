const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const userRoutes = require("./route/users");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

// servidor de express
const app = express();

// Banco de dados
dbConnection();

// CORS
app.use(cors())

// Diretório Público
app.use( express.static('public') );

// Leitura do body
app.use( express.json() );

// Rotas
//Users route
app.use("/api/users", userRoutes);


//err handler
app.use(notFound);
app.use(errorHandler);

app.listen( process.env.PORT, () => {
    console.log(`Servidor na porta ${ process.env.PORT }`);
});
