
create table proprietario (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(300) not null,
    endereco varchar (600),
    cpf varchar (15),
    data_nascimento date    
);


create table pets (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(300) not null,
    data_nascimento date    
);
