-- Table: Anuncio
-- DROP TABLE Anuncio
CREATE TABLE Anuncio
(
  titulo char(140) NOT NULL,
  descricao char(140),
  username char(50) NOT NULL,
  pontuacao_anuncio int,
  id int NOT NULL DEFAULT nextval('"anuncio_ID_seq"'::regclass),
  fechado boolean NOT NULL,
  categoria char(20),
  CONSTRAINT "pkAnuncio" PRIMARY KEY (id),
  CONSTRAINT "fkUsername_anuncio" FOREIGN KEY (username)
      REFERENCES Utilizador (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
  CONSTRAINT "fkCat_anuncio" FOREIGN KEY (designacao)
      REFERENCES Categoria (designacao) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE Anuncio
  OWNER TO ClxSuperUser;