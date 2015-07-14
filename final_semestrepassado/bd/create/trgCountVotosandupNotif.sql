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