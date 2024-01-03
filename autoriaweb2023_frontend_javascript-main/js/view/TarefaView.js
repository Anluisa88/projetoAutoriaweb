/**
 * Renderiza o formulário para criar uma nova proprietario.
 * @return {string} HTML do formulário de criação de proprietario.
 */
function renderizarFormulario() {
  return `
       <form class="mt-3" id="formulario_proprietario">
            <div class="form-group">
            <label for="proprietario_Nome">Nome da proprietario:</label>
            <input type="text" class="form-control" id="proprietario_Nome_formulario" value="${proprietario.nome}">
        </div>

        <div class="form-group">
            <label for="proprietario_cpf">cpf da proprietario:</label>
            <input type="text" class="form-control" id="proprietario_cpf_formulario" value="${proprietario.cpf}">
        </div>

        <div class="form-group">
            <label for="proprietario_endereco">Nome da proprietario:</label>
            <input type="text" class="form-control" id="proprietario_endereco_formulario" value="${proprietario.endereco}">
        </div>

        <div class="form-group">
            <label for="proprietario_data_nascimento">Nome da proprietario:</label>
            <input type="text" class="form-control" id="proprietario_data_nascimento_formulario" value="${proprietario.data_nascimento}">
        </div>


                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma proprietario existente.
 * @param {Object} proprietario - A proprietario a ser atualizada.
 * @return {string} HTML do formulário de atualização de proprietario.
 */
function renderizarFormularioAtualizar(proprietario) {
    return `
    <form class="mt-3" id="formulario_proprietario_atualizar">
    <input type="hidden" class="form-control" id="proprietario_id_formulario" value="${proprietario.id}">

    <div class="form-group">
        <label for="proprietario_Nome">Nome da proprietario:</label>
        <input type="text" class="form-control" id="proprietario_Nome_formulario" value="${proprietario.nome}">
    </div>

    <div class="form-group">
        <label for="proprietario_cpf">cpf da proprietario:</label>
        <input type="text" class="form-control" id="proprietario_cpf_formulario" value="${proprietario.cpf}">
    </div>

    <div class="form-group">
        <label for="proprietario_endereco">Nome da proprietario:</label>
        <input type="text" class="form-control" id="proprietario_endereco_formulario" value="${proprietario.endereco}">
    </div>

    <div class="form-group">
        <label for="proprietario_data_nascimento">Nome da proprietario:</label>
        <input type="text" class="form-control" id="proprietario_data_nascimento_formulario" value="${proprietario.data_nascimento}">
    </div>

    <button type="submit" class="btn btn-primary mt-2">Salvar</button>
</form>
        `;
}

  /**
 * Renderiza a tabela de proprietarios.
 * @param {Array} proprietarios - Lista de proprietarios a serem exibidas.
 * @return {string} HTML da tabela de proprietarios.
 */
function renderizarTabela(proprietarios) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>id</th>
                      <th>nome</th>
                      <th>cpf</th>
                      <th>endereco</th>
                      <th>data_nascimento</th>
                  </tr>
              </thead>
              <tbody>
      `;

  proprietarios.forEach((proprietario) => {
    tabela += `
              <tr>
                  <td>${proprietario.nome}</td>
                  <td>${proprietario.endereco}</td>
                  <td>${proprietario.cpf}</td>
                  <td>${proprietario.data_nascimento}</td>
                  <td>${proprietario.id}</td>
                  <td>
                    <button class="excluir-btn" proprietario-id=${proprietario.id}>Excluir</button>
                    <button class="atualizar-btn" proprietario-atualizar-id=${proprietario.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
      `;

  return tabela;
}

const proprietarioView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default proprietarioView;
