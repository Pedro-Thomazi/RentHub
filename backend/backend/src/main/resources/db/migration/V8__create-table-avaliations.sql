CREATE TABLE avaliations(
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            anuncio_id BIGINT NOT NULL,
                            comment TEXT,
                            avaliation DECIMAL(10,2),
                            data_comment TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (anuncio_id) REFERENCES anuncios(id)
);