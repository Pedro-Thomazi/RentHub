import { Link } from 'react-router-dom'
import styles from './CardOfertas.module.scss'

interface DataAnnouncement {
  id: number
  titulo: string
  preco: number
  localizacao: string
  avaliacao: number
  disponivel: boolean
}

const CardOfertas = ({ id, titulo, preco, localizacao, avaliacao, disponivel }: DataAnnouncement) => {
  return (
    <Link className={styles.card} to={`/${titulo}/${id}`}>
      <img src={'/'} alt="Apartamentos xyz" />
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
