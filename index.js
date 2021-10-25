const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


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





app.listen( process.env.PORT, () => {
    console.log(`Servidor na porta ${ process.env.PORT }`);
});
