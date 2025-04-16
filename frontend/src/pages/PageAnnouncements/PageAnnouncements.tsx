import styles from './PageAnnouncements.module.scss'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import PageHotels from './PageHotels'
import PageHomes from './PageHomes'
import PageApartaments from './PageApartaments'

const PageAnnouncements = () => {
  const { tipo } = useParams()
  return (
    <main className={styles.containerAnnouncement}>
      <Header tipo={tipo} principalText='' secondaryText='Escolha a melhor opção para sua estadia.' />
      <section>
        {tipo == "hoteis" && <PageHotels />}
        {tipo == "casas" && <PageHomes />}
        {tipo == "apartamentos" && <PageApartaments />}
      </section>
    </main>
  )
}

export default PageAnnouncements
