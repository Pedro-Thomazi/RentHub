CREATE TABLE images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    anuncio_id BIGINT NOT NULL,
    name_img_file VARCHAR(100),
    FOREIGN KEY (anuncio_id) REFERENCES anuncios(id)
);