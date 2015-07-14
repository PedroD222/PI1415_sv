-- Table: categoriaqueixinha

-- DROP TABLE categoriaqueixinha;

CREATE TABLE categoriaqueixinha
(
  queixinha integer NOT NULL,
  categoria character(20) NOT NULL,
  CONSTRAINT pkcatqueix PRIMARY KEY (queixinha, categoria),
  CONSTRAINT "fkQueixinha" FOREIGN KEY (queixinha)
      REFERENCES queixinha (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkcat FOREIGN KEY (categoria)
      REFERENCES categoria (designacao) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE categoriaqueixinha
  OWNER TO queixinhauser;
