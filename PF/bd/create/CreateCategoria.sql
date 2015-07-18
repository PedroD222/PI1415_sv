-- Table: Categoria
-- DROP TABLE Categoria
CREATE TABLE Categoria
(
  designacao char(20) NOT NULL,
  CONSTRAINT "pkCat" PRIMARY KEY (designacao)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE Categoria
  OWNER TO ClxSuperUser;  