-- Table: votacao

-- DROP TABLE votacao;

CREATE TABLE votacao
(
  id_queixinha integer NOT NULL,
  username character(50) NOT NULL,
  correta boolean NOT NULL,
  CONSTRAINT pkvotacao PRIMARY KEY (id_queixinha, username),
  CONSTRAINT "fkQueixinha" FOREIGN KEY (id_queixinha)
      REFERENCES queixinha (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fkUser" FOREIGN KEY (username)
      REFERENCES utilizador (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE votacao
  OWNER TO queixinhauser;
