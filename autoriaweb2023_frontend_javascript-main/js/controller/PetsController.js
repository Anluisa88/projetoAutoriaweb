import PetsView from "../view/PetsView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de pet
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = PetsView.renderizarFormulario();
  document.getElementById("formulario_pet").addEventListener("submit", cadastrarpet);
}

/**
 * Cadastra uma nova pet
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarpet(event) {
  event.preventDefault();
  const nomeValor = document.getElementById("nome").value;
  const data_nascimentoValor = document.getElementById("data_nascimento").value;
  const novopets = { nome: nomeValor,  data_nascimento: data_nascimentoValor};

  try {
    await fetch(`${API_BASE_URL}/pets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novopets),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListapets(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar pet", error);
  }
}
/**
 * Renderiza a lista de pet.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListapets(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/pets");
    const petsBD = await response.json(); 

    const pet = petsBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome, 
        data_nascimento: row.data_nascimento
      };
    });
    componentePrincipal.innerHTML = PetsView.renderizarTabela(pet);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar pet:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de pet
 * Cada botão, quando clicado, aciona a função de exclusão de petcorrespondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const petd = this.getAttribute("pet_id");
      excluirpet(petd);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de pet
 * Cada botão, quando clicado, aciona a função de buscar a petespecífica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const petd = this.getAttribute("pet_id");
      buscarpet(petd);
    });
  });
}

/**
 * Exclui uma petespecífica com base no ID.
 * Após a exclusão bem-sucedida, a lista de pet é atualizada.
 * @param {string} id - ID da peta ser excluída.
 */
async function excluirpet(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a pet");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListapets(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a pet", error);
  }
}

/**
 * Busca uma petespecífica para atualização, com base no ID.
 * Após encontrar a pet renderiza o formulário de atualização.
 * @param {string} id - ID da peta ser buscada.
 */
async function buscarpet(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/${id}`);
    const petBD = await response.json();
    if (petBD.length <= 0) return;

    const pet= petBD.map(row => ({
      id: row.id,
      nome: row.nome,
      data_nascimento: row.data_nascimento,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = PetsView.renderizarFormularioAtualizar(pet);
    document.getElementById("formulario_pet_atualizar").addEventListener("submit", atualizarpet);
  } catch (error) {
    console.error("Erro ao buscar pet:", error);
  }
}

/**
 * Atualiza uma petespecífica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarpet(event) {
  event.preventDefault();
  const idValor = document.getElementById("id").value;
  const nomeValor = document.getElementById("nome").value;
  const data_nascimentoValor = document.getElementById("data_nascimento").value;
  const petatualizado = { id: idValor, nome: nomeValor, data_nascimento: data_nascimentoValor};

  try {
    const response = await fetch(`${API_BASE_URL}/pets`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(petatualizado),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a pet");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListapets(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar pet", error);
  }
}

const petsController = {
  renderizarFormulario,
  cadastrarpet,
  renderizarListapets,
  excluirpet,
  atualizarpet
};

export default petsController;
