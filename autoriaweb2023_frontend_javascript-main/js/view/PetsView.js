/**
 * Renderiza o formulário para criar uma nova pet.
 * @return {string} HTML do formulário de criação de pet.
 */
function renderizarFormulario() {
    return `
            <form class="mt-3" id="formulario_pet">
            <div class="form-group">
            <label for="pet_Nome">Nome do pet:</label>
            <input type="text" class="form-control" id="nome">
        </div>
        
        <div class="form-group">
            <label for="pet_data_nascimento">Data de nascimento do pet:</label>
            <input type="text" class="form-control" id="data_nascimento">
        </div>


                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma pet existente.
   * @param {Object} pet - A pet a ser atualizada.
   * @return {string} HTML do formulário de atualização de pet.
   */
  function renderizarFormularioAtualizar(pet) {
      return `
              <form class="mt-3" id="formulario_pet_atualizar">
                  <input type="hidden" class="form-control" id="id" value="${pet.id}">

                  <div class="form-group">
                      <label for="pet_Nome">Nome do pet:</label>
                      <input type="text" class="form-control" id="nome" value="${pet.nome}">
                  </div>

                  <div class="form-group">
                      <label for="pet_data_nascimento">Data de nascimento:</label>
                      <input type="text" class="form-control" id="data_nascimento" value="${pet.data_nascimento}">
                  </div>

                  <button type="submit" class="btn btn-primary mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de pets.
   * @param {Array} pets - Lista de pets a serem exibidas.
   * @return {string} HTML da tabela de pets.
   */
  function renderizarTabela(pets) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>data_nascimento</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    pets.forEach((pet) => {
      tabela += `
                <tr>
                    <td>${pet.nome}</td>
                    <td>${pet.data_nascimento}</td>
                    <td>
                      <button class="excluir-btn" pet_id=${pet.id}>Excluir</button>
                      <button class="atualizar-btn" pet_id=${pet.id}>Atualizar</button>
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
  
  const petView = {
      renderizarFormulario,
      renderizarTabela,
      renderizarFormularioAtualizar
      
  };
  
  export default petView;
  