const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarComandoSQL(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todas as proprietarios
router.get('/', (req, res) => {
  executarComandoSQL('SELECT * FROM  proprietario', [], res, "Erro na consulta de proprietario");
});

// Rota para buscar uma proprietario específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarComandoSQL('SELECT * FROM proprietario WHERE id = ?', [id], res, "Erro na consulta de proprietario");
});

// Rota para criar uma nova proprietario
router.post('/', (req, res) => {
  const { nome, endereco, cpf, data_nascimento} = req.body;
  executarComandoSQL('INSERT INTO proprietario (nome, endereco, cpf, data_nascimento) VALUES (?,?,?,?)', [nome, endereco, cpf, data_nascimento], res, "Erro no cadastro de proprietario!");
});

// Rota para deletar uma proprietario
router.delete("/:id", (req, res) => {
  const proprietarioId = req.params.id;
  executarComandoSQL('DELETE FROM proprietario WHERE id = ?', [proprietarioId], res, 'Erro ao deletar proprietario');
});

// Rota para atualizar uma proprietario
router.put('/', (req, res) => {
  const { id, nome, endereco, cpf, data_nascimento} = req.body;
  executarComandoSQL('UPDATE proprietario SET nome = ?, endereco = ?, cpf = ? , data_nascimento = ? WHERE id = ?', [nome, endereco, cpf, data_nascimento, id], res, "Erro ao atualizar proprietario");
});

module.exports = router;