import { Link } from 'react-router-dom'
import styles from './CardOfertas.module.scss'

interface DataAnnouncement {
  id: number
  titulo: string
  preco: number
  localizacao: string
  avaliacao: number
  disponivel: boolean
  urlImage: FileList | null
}

interface DataCard extends DataAnnouncement {
  url: string
}


const CardOfertas = ({ id, titulo, preco, localizacao, avaliacao, disponivel, urlImage, url }: DataCard) => {
  return (
    <Link className={styles.card} to={url}>
      <img src={`http://localhost:8080/uploads/images/${urlImage}`} alt={titulo + " foto"} />
      <p className={styles.description}>{titulo}</p>
      <p className={styles.location}>{localizacao}</p>
      <span className={styles.avaliation}>
        <p className={styles.number}>{avaliacao}</p>
        <p>Muito Bom . </p>
        <p>100+ avaliações</p>
      </span>
      {disponivel ? (
        <span className={styles.price}>
          <p>diária</p>
          <p className={styles.number}>R$ {preco.toFixed(2).replace(".", ",")}</p>
        </span>
      ) : (
        <p className={styles.indisponivel}>Indisponível</p>
      )}

    </Link>
  )
}

export default CardOfertas
