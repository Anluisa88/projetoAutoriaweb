/**
 * Renderiza o formulário para criar uma nova proprietario.
 * @return {string} HTML do formulário de criação de proprietario.
 */
function renderizarFormulario() {
    return `
            <form class="mt-3" id="formulario_proprietario">
            <div class="form-group">
            <label for="proprietario_Nome">Nome do proprietario:</label>
            <input type="text" class="form-control" id="nome">
        </div>

        <div class="form-group">
            <label for="proprietario_cpf">Cpf do proprietario:</label>
            <input type="text" class="form-control" id="cpf">
        </div>

        <div class="form-group">
            <label for="proprietario_endereco">Endereco do proprietario:</label>
            <input type="text" class="form-control" id="endereco">
        </div>

        <div class="form-group">
            <label for="proprietario_data_nascimento">Data de nascimento do proprietario:</label>
            <input type="text" class="form-control" id="data_nascimento">
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
                  <input type="hidden" class="form-control" id="id" value="${proprietario.id}">

                  <div class="form-group">
                      <label for="proprietario_Nome">Nome do proprietario:</label>
                      <input type="text" class="form-control" id="nome" value="${proprietario.nome}">
                  </div>

                  <div class="form-group">
                      <label for="proprietario_cpf">Cpf do proprietario:</label>
                      <input type="text" class="form-control" id="cpf" value="${proprietario.cpf}">
                  </div>

                  <div class="form-group">
                      <label for="proprietario_endereco"> Endereço do proprietario:</label>
                      <input type="text" class="form-control" id="endereco" value="${proprietario.endereco}">
                  </div>

                  <div class="form-group">
                      <label for="proprietario_data_nascimento">Data de nascimento:</label>
                      <input type="text" class="form-control" id="data_nascimento" value="${proprietario.data_nascimento}">
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
                        <th>Nome</th>
                        <th>Endereco</th>
                        <th>cpf</th>
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
                    <td>
                      <button class="excluir-btn" proprietario_id=${proprietario.id}>Excluir</button>
                      <button class="atualizar-btn" proprietario_id=${proprietario.id}>Atualizar</button>
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
  