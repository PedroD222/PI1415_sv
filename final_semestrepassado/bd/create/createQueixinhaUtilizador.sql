-- Table: queixinhautilizador

-- DROP TABLE queixinhautilizador;

CREATE TABLE queixinhautilizador
(
  username character(50) NOT NULL,
  queixinha integer NOT NULL,
  notificacao boolean NOT NULL DEFAULT false,
  datanotificacao timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "pkQueiUtili" PRIMARY KEY (queixinha, username),
  CONSTRAINT fkqueixinha FOREIGN KEY (queixinha)
      REFERENCES queixinha (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkuser FOREIGN KEY (username)
      REFERENCES utilizador (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE queixinhautilizador
  OWNER TO queixinhauser;
