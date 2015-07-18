-- Table: AnuncioUtilizadorFavorito
-- DROP TABLE AnuncioUtilizadorFavorito
CREATE TABLE AnuncioUtilizadorFavorito
(
  username char(50) NOT NULL,
  id_anuncio int NOT NULL DEFAULT nextval('"Comentario_Id_anuncio_seq"'::regclass),
  CONSTRAINT "pkAnuncio" PRIMARY KEY (username, id_anuncio),
  CONSTRAINT "fkUsername_AnuncioUtilizadorFavorito" FOREIGN KEY (username)
      REFERENCES Utilizador (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
  CONSTRAINT "fkAnuncio_AnuncioUtilizadorFavorito" FOREIGN KEY (id_anuncio)
      REFERENCES Anuncio (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE AnuncioUtilizadorFavorito
  OWNER TO ClxSuperUser;