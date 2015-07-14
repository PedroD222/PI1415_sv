-- Table: queixinha

-- DROP TABLE queixinha;

CREATE TABLE queixinha
(
  titulo character(140) NOT NULL,
  descricao character(140),
  username character(50) NOT NULL,
  votos_corretos integer,
  votos_incorretos integer,
  id integer NOT NULL DEFAULT nextval('"Queixinha_ID_seq"'::regclass),
  geo_referencia character(20),
  fechada boolean NOT NULL,
  CONSTRAINT "pkQueixinha" PRIMARY KEY (id),
  CONSTRAINT username FOREIGN KEY (username)
      REFERENCES utilizador (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE queixinha
  OWNER TO queixinhauser;
