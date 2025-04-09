ALTER TABLE anuncios ADD COLUMN avaliacao DECIMAL(10,2);
ALTER TABLE anuncios ADD COLUMN cidade VARCHAR(100);
UPDATE anuncios SET avaliacao = 0, cidade = "ATUALIZAR";