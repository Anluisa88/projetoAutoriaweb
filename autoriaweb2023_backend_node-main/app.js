const express = require('express');
const cors = require('cors');
const ProprietarioController = require('./controllers/ProprietarioController');
const PetController = require('./controllers/PetController');
const LoginRouter = require('./controllers/LoginController');

// Cria uma instância do servidor Express.
const app = express();

// Aplica o middleware para parsear JSON no corpo das requisições.
app.use(express.json());

// Habilita o CORS para permitir requisições de diferentes origens.
app.use(cors());

// Define a rota "/proprietarios" e associa ao router importado.
app.use("/proprietarios", ProprietarioController);
app.use("/pets", PetController);
app.use("/login", LoginRouter);

// Define a porta do servidor, com um fallback para a porta 3000 se não estiver definida.
const PORT = process.env.PORT || 3000;

// Inicia o servidor na porta especificada.
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});