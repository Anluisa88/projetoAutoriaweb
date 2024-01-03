import proprietarioView from "../view/proprietarioView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de proprietario
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = proprietarioView.renderizarFormulario();
  document.getElementById("formulario_proprietario").addEventListener("submit", cadastrarproprietario);
}

/**
 * Cadastra uma nova proprietario
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarproprietario(event) {
  event.preventDefault();
  const nomeValor = document.getElementById("nome").value;
  const enderecoValor = document.getElementById("endereco").value;
  const cpfValor = document.getElementById("cpf").value;
  const data_nascimentoValor = document.getElementById("data_nascimento").value;
  const novoproprietario = { nome: nomeValor, endereco: enderecoValor, cpf: cpfValor, data_nascimento: data_nascimentoValor};

  try {
    await fetch(`${API_BASE_URL}/proprietarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoproprietario),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaproprietarios(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar proprietario", error);
  }
}
/**
 * Renderiza a lista de proprietario.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaproprietarios(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/proprietarios");
    const proprietariosBD = await response.json(); 

    const proprietario = proprietariosBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        endereco: row.endereco,
        cpf: row.cpf,
        data_nascimento: row.data_nascimento
      };
    });
    componentePrincipal.innerHTML = proprietarioView.renderizarTabela(proprietario);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar proprietario:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de proprietario
 * Cada botão, quando clicado, aciona a função de exclusão de proprietariocorrespondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const proprietariod = this.getAttribute("proprietario_id");
      excluirproprietario(proprietariod);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de proprietario
 * Cada botão, quando clicado, aciona a função de buscar a proprietarioespecífica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const proprietariod = this.getAttribute("proprietario_id");
      buscarproprietario(proprietariod);
    });
  });
}

/**
 * Exclui uma proprietarioespecífica com base no ID.
 * Após a exclusão bem-sucedida, a lista de proprietario é atualizada.
 * @param {string} id - ID da proprietarioa ser excluída.
 */
async function excluirproprietario(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/proprietarios/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a proprietario");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaproprietarios(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a proprietario", error);
  }
}

/**
 * Busca uma proprietarioespecífica para atualização, com base no ID.
 * Após encontrar a proprietario renderiza o formulário de atualização.
 * @param {string} id - ID da proprietarioa ser buscada.
 */
async function buscarproprietario(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/proprietarios/${id}`);
    const proprietarioBD = await response.json();
    if (proprietarioBD.length <= 0) return;

    const proprietario= proprietarioBD.map(row => ({
      id: row.id,
      nome: row.nome,
      endereco: row.endereco,
      cpf: row.cpf,
      data_nascimento: row.data_nascimento,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = proprietarioView.renderizarFormularioAtualizar(proprietario);
    document.getElementById("formulario_proprietario_atualizar").addEventListener("submit", atualizarproprietario);
  } catch (error) {
    console.error("Erro ao buscar proprietario:", error);
  }
}

/**
 * Atualiza uma proprietarioespecífica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarproprietario(event) {
  event.preventDefault();
  const idValor = document.getElementById("id").value;
  const nomeValor = document.getElementById("nome").value;
  const enderecoValor = document.getElementById("endereco").value;
  const cpfValor = document.getElementById("cpf").value;
  const data_nascimentoValor = document.getElementById("data_nascimento").value;
  const proprietarioatualizado = { id: idValor, nome: nomeValor, endereco: enderecoValor, cpf: cpfValor, data_nascimento: data_nascimentoValor};

  try {
    const response = await fetch(`${API_BASE_URL}/proprietarios`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(proprietarioatualizado),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a proprietario");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaproprietarios(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar proprietario", error);
  }
}

const proprietarioController = {
  renderizarFormulario,
  cadastrarproprietario,
  renderizarListaproprietarios,
  excluirproprietario,
  atualizarproprietario
};

export default proprietarioController;
