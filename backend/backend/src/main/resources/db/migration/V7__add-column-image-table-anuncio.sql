ALTER TABLE anuncios ADD COLUMN principal_image VARCHAR(100);
UPDATE anuncios SET principal_image = "ATUALIZAR IMAGEM PRINCIPAL";