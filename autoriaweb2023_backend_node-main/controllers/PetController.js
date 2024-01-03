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

// Rota para buscar todas as petss
router.get('/', (req, res) => {
  executarComandoSQL('SELECT * FROM  pets', [], res, "Erro na consulta de pets");
});

// Rota para buscar uma pets específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarComandoSQL('SELECT * FROM pets WHERE id = ?', [id], res, "Erro na consulta de pets");
});

// Rota para criar uma nova pets
router.post('/', (req, res) => {
  const { nome, data_nascimento} = req.body;
  executarComandoSQL('INSERT INTO pets (nome,  data_nascimento) VALUES (?,?)', [nome,data_nascimento], res, "Erro no cadastro de pets!");
});

// Rota para deletar uma pets
router.delete("/:id", (req, res) => {
  const petsId = req.params.id;
  executarComandoSQL('DELETE FROM pets WHERE id = ?', [petsId], res, 'Erro ao deletar pets');
});

// Rota para atualizar uma pets
router.put('/', (req, res) => {
  const { id, nome, data_nascimento} = req.body;
  executarComandoSQL('UPDATE pets SET nome = ?,  data_nascimento = ? WHERE id = ?', [nome, data_nascimento, id], res, "Erro ao atualizar pets");
});

module.exports = router;