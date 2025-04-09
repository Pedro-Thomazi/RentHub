CREATE TABLE anuncios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    titulo VARCHAR(100),
    descricao TEXT,
    preco DECIMAL(10,2),
    tipo_imovel VARCHAR(100) NOT NULL,
    endereco VARCHAR(255),
    disponivel BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id)
);