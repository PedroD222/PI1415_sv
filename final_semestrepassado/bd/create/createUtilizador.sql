-- Table: utilizador

-- DROP TABLE utilizador;

CREATE TABLE utilizador
(
  username character(50) NOT NULL,
  email character(50) NOT NULL,
  gestor boolean NOT NULL,
  hash text NOT NULL,
  salt text NOT NULL,
  CONSTRAINT utilizador_pkey PRIMARY KEY (username),
  CONSTRAINT unemail UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE utilizador
  OWNER TO queixinhauser;
