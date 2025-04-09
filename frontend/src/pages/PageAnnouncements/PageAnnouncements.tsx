import { FaSearch } from 'react-icons/fa'
import Logo from '../../components/Logo/Logo'
import styles from './PageAnnouncements.module.scss'
import { Outlet, useParams } from 'react-router-dom'

const PageAnnouncements = () => {
  const {tipo} = useParams()
  const text = "Escolha a melhor opção para sua estadia."
  return (
    <main className={styles.containerAnnouncement}>
      <header>
        <Logo />
        {tipo == "hoteis" && <h1>Hotéis disponíveis. <br /><span>{text}</span></h1>}
        {tipo == "casas" && <h1>Casas disponíveis. <br /><span>{text}</span></h1>}
        {tipo == "apartamentos" && <h1>Apartamentos disponíveis. <br /><span>{text}</span></h1>}
        <form>
          <label>
            <input type="search" name="" id="" />
            <FaSearch size={30} />
          </label>
        </form>
      </header>
      <section>
        <Outlet />
      </section>
    </main>
  )
}

export default PageAnnouncements
