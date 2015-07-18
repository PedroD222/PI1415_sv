-- Table: Utilizador
-- DROP TABLE Utilizador
CREATE TABLE Utilizador
(
  username char(50) NOT NULL,
  email char(50) NOT NULL,
  gestor boolean NOT NULL,
  hash text NOT NULL,
  salt text NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (username),
  CONSTRAINT unemail UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE Utilizador
  OWNER TO ClxSuperUser;