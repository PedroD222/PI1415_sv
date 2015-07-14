-- Table: comentario

-- DROP TABLE comentario;

CREATE TABLE comentario
(
  id integer NOT NULL DEFAULT nextval('"Comentario_Id_seq"'::regclass),
  id_queixinha integer NOT NULL DEFAULT nextval('"Comentario_Id_Queixinha_seq"'::regclass),
  comentario character(140) NOT NULL,
  username character(50) NOT NULL,
  CONSTRAINT "pkComentario" PRIMARY KEY (id, id_queixinha),
  CONSTRAINT "fkQueixinha" FOREIGN KEY (id_queixinha)
      REFERENCES queixinha (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "user" FOREIGN KEY (username)
      REFERENCES utilizador (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE comentario
  OWNER TO queixinhauser;

-- Trigger: udpatenotificacao on comentario

-- DROP TRIGGER udpatenotificacao ON comentario;

CREATE TRIGGER udpatenotificacao
  AFTER INSERT OR UPDATE
  ON comentario
  FOR EACH ROW
  EXECUTE PROCEDURE udpatenotificacao();

