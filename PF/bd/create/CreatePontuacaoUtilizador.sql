CREATE SEQUENCE PontuacaoUtilizador_ID_seq;

CREATE TABLE PontuacaoUtilizador(
	id integer NOT NULL DEFAULT nextval('PontuacaoUtilizador_ID_seq'::regclass),
	username char(50) not null,
	pontacao int not null,
	CONSTRAINT "fkUsername_PontuacaoUtilizador" 
	FOREIGN KEY (username) REFERENCES Utilizador (username) 
	MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, 
)
