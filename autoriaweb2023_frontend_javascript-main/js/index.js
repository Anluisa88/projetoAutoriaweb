import loginController from "../js/controller/LoginController.js";
import petsController from "./controller/PetsController.js";
import ProprietariosController from "./controller/ProprietariosController.js";

// Função auxiliar para selecionar elementos no DOM.
const $ = document.querySelector.bind(document);
const componentePrincipal = $("#conteudo_principal");

/**
 * Verifica se o usuário está logado. 
 * Mostra ou esconde o conteúdo principal com base no status de login.
 */
function verificarLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    mostrarConteudoPrincipal();
  } else {
    esconderConteudoPrincipal();
  }
}

/**
 * Mostra o conteúdo principal e esconde a tela de login.
 */
function mostrarConteudoPrincipal() {
  $('#login').style.display = 'none';
  $('#app').style.display = 'block';
}

/**
 * Esconde o conteúdo principal, remove o token do localStorage e mostra a tela de login.
 */
function esconderConteudoPrincipal() {
  localStorage.removeItem('token');
  $('#login').style.display = 'flex';
  $('#app').style.display = 'none';
  $("#usuario").value = "";
  $("#senha").value = "";
}

// Adiciona um ouvinte de evento para verificar o login quando o documento estiver totalmente carregado.
document.addEventListener('DOMContentLoaded', verificarLogin);

// Adiciona ouvintes de eventos para itens de menu.
$("#cadastrar_proprietario").addEventListener("click", function() {
  fecharNavBar();
  ProprietariosController.renderizarFormulario(componentePrincipal);
});

$("#lista_proprietario").addEventListener("click", function() {
  fecharNavBar();
  ProprietariosController.renderizarListaproprietarios(componentePrincipal);
});


$("#cadastrar_pet").addEventListener("click", function() {
  fecharNavBar();
  petsController.renderizarFormulario(componentePrincipal);
});

$("#lista_pet").addEventListener("click", function() {
  fecharNavBar();
  petsController.renderizarListapets(componentePrincipal);
});


// Adiciona ouvinte de evento para o formulário de login.
$("#login-form").addEventListener('submit', loginController.realizarLogin);

// Adiciona ouvinte de evento para o botão de logout.
$("#logout").addEventListener("click", esconderConteudoPrincipal);

/**
 * Fecha a barra de navegação lateral (navbar).
 */
function fecharNavBar() {
  const closeCanvas = $('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
}