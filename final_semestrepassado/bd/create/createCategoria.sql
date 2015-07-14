-- Table: categoria

-- DROP TABLE categoria;

CREATE TABLE categoria
(
  designacao character(20) NOT NULL,
  CONSTRAINT pkcateg PRIMARY KEY (designacao)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE categoria
  OWNER TO queixinhauser;
