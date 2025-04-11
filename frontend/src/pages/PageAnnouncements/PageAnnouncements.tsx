import { FaSearch } from 'react-icons/fa'
import Logo from '../../components/Logo/Logo'
import styles from './PageAnnouncements.module.scss'
import { Link, Outlet, useParams } from 'react-router-dom'

const PageAnnouncements = () => {
  const { tipo } = useParams()
  const text = "Escolha a melhor opção para sua estadia."
  return (
    <main className={styles.containerAnnouncement}>
      <header>
        <Logo />
        {tipo == "hoteis" && (
          <>
            <h1>Hotéis disponíveis. <br /><span>{text}</span></h1>
            <nav>
              <Link to={"/anuncios/casas"}>Casas</Link>
              <Link to={"/anuncios/apartamentos"}>Apartamentos</Link>
            </nav>
          </>
        )}
        {tipo == "casas" && (
          <>
            <h1>Casas disponíveis. <br /><span>{text}</span></h1>
            <nav>
              <Link to={"/anuncios/hoteis"}>Hotéis</Link>
              <Link to={"/anuncios/apartamentos"}>Apartamentos</Link>
            </nav>
          </>
        )
        }
        {tipo == "apartamentos" && (
          <>
            <h1>Apartamentos disponíveis. <br /><span>{text}</span></h1>
            <nav>
              <Link to={"/anuncios/hoteis"}>Hotéis</Link>
              <Link to={"/anuncios/casas"}>Casas</Link>
            </nav>
          </>
        )
        }
        <nav>

        </nav>
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
