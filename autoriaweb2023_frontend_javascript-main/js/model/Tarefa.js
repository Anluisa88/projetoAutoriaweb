export class proprietario {
  constructor( nome, endereco, cpf, data_nascimento, id) {
      this.nome = nome;
      this.endereco = endereco;
      this.cpf = cpf;
      this.data_nascimento = data_nascimento;
      this.id = id;


      this._isCompleta = false;
      this._dataAbertura = Date.now();
      this._dataPrevistaFinalizacao = null;
      this._usuario = null;
  }

  set nome(nome){
    this.nome = nome;
  }

  set endereco (endereco){
    this.endereco = endereco ;
  }

  set cpf (cpf){
    this.cpf = cpf ;
  }

  set data_nascimento (data_nascimento){
    this.data_nascimento = data_nascimento ;
  }

  set id (id){
    this.id = id ;
  }


/* set isCompleta (isCompleta){
    this._isCompleta = isCompleta ;
  }

  set dataAbertura (dataAbertura){
    this._dataAbertura = dataAbertura ;
  }

  set dataPrevistaFinalizacao (_dataPrevistaFinalizacao){
    this._dataPrevistaFinalizacao = dataPrevistaFinalizacao ;
  }

  set usuario (usuario){
    this._usuario = usuario ;
  }
*/

  get nome(){
    return this.nome;
  }

  get endereco(){
    return this.endereco;
  }  
  
  get cpf(){
    return this.cpf;
  }  
  get data_nascimento(){
    return this.data_nascimento;
  }  

  get id(){
    return this.id;
  }  




  /*get isCompleta(){
    return this._isCompleta;
  }    

  get dataAbertura(){
    return this._dataAbertura;
  }   

  get dataPrevistaFinalizacao(){
    return this._dataPrevistaFinalizacao;
  }    

  get usuario(){
    return this._usuario;
  }   
*/
}
