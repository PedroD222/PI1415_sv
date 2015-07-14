CREATE FUNCTION udpatenotificacao() RETURNS trigger AS $udpatenotificacao$
    BEGIN
	update queixinhautilizador set notificacao = true, datanotificacao = now()
	where queixinha = NEW.id_queixinha;
	return null;
    END;
$udpatenotificacao$ LANGUAGE plpgsql;

CREATE TRIGGER udpatenotificacao AFTER INSERT OR UPDATE ON comentario
    FOR EACH ROW EXECUTE PROCEDURE udpatenotificacao();