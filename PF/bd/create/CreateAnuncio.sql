-- Table: Anuncio
-- DROP TABLE Anuncio
--CREATE SEQUENCE Anuncio_ID_seq;
CREATE TABLE Anuncio
(
  id integer NOT NULL DEFAULT nextval('Anuncio_ID_seq'::regclass),
  titulo char(140) NOT NULL,
  descricao char(140),
  username char(50) NOT NULL,
  pontuacao_anuncio int,
  fechado boolean NOT NULL,
  categoria char(20),
  CONSTRAINT "pkAnuncio" PRIMARY KEY (id),
  CONSTRAINT "fkUsername_anuncio" FOREIGN KEY (username)
      REFERENCES Utilizador (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fkCat_anuncio" FOREIGN KEY (categoria)
      REFERENCES Categoria (designacao) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE Anuncio
  OWNER TO ClxSuperUser;