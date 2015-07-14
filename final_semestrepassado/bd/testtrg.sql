CREATE FUNCTION udpatenotificacao() RETURNS trigger AS $udpatenotificacao$
    BEGIN
	update queixinhautilizador set notificacao = true, datanotificacao = now()
	where queixinha = NEW.id_queixinha;
	return null;
    END;
$udpatenotificacao$ LANGUAGE plpgsql;

CREATE TRIGGER udpatenotificacao AFTER INSERT OR UPDATE ON comentario
    FOR EACH ROW EXECUTE PROCEDURE udpatenotificacao();

INSERT into queixinha(titulo, username, fechada) values('triggerpostgres', 'Pedro', false);

INSERT into queixinhautilizador(username, queixinha) values('Pedro', 77);

INSERT into comentario(id_queixinha, comentario, username) values(77, 'vamosver', 'Pedro');

INSERT into votacao(username, id_queixinha,correta) values('Luz',77, false);
INSERT into votacao(username, id_queixinha,correta) values('Miguel',77, true);

CREATE FUNCTION contvotosupnotif() RETURNS trigger AS $contvotosupnotif$
    BEGIN
	update queixinhautilizador set notificacao = true, datanotificacao = now()
	where queixinha = NEW.id_queixinha and username in (select username from queixinha where id = NEW.id_queixinha); 
	if (NEW.correta) then
			update queixinha set votos_corretos = votos_corretos + 1
			where id = NEW.id_queixinha;
	elsif(not New.correta) then
			update queixinha set votos_incorretos = votos_incorretos + 1
			where id = NEW.id_queixinha;
	end if;
        RETURN Null;
    END;
$contvotosupnotif$ LANGUAGE plpgsql;

CREATE TRIGGER contvotosupnotif AFTER INSERT OR UPDATE OR DElete ON votacao
    FOR EACH ROW EXECUTE PROCEDURE contvotosupnotif();

    drop trigger contvotosupnotif;

    select * from votacao
    select * from queixinha