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