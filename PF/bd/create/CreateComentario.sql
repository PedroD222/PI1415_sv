-- Table: Comentario
-- DROP TABLE Comentario
CREATE TABLE Comentario
(
  id int NOT NULL DEFAULT nextval('"Comentario_Id_seq"'::regclass),
  id_anuncio int NOT NULL DEFAULT nextval('"Comentario_Id_anuncio_seq"'::regclass),
  comentario char(140) NOT NULL,
  username char(50) NOT NULL,
  CONSTRAINT "pkComentario" PRIMARY KEY (id, id_anuncio),
  CONSTRAINT "fkAnuncio_comentario" FOREIGN KEY (id_anuncio)
      REFERENCES Anuncio (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fkUsername_comentario" FOREIGN KEY (username)
      REFERENCES Utilizador (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE Comentario
  OWNER TO ClxSuperUser;