import styles from './PageAnnouncements.module.scss'
import { Outlet, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'

const PageAnnouncements = () => {
  const { tipo } = useParams()
  return (
    <main className={styles.containerAnnouncement}>
      <Header tipo={tipo} principalText='' secondaryText='Escolha a melhor opção para sua estadia.' />
      <section>
        <Outlet />
      </section>
    </main>
  )
}

export default PageAnnouncements
