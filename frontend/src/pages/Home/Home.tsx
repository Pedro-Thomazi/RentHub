import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './Home.module.scss'

import fotoCasa from "../../assets/Images/fotoCasa.jpg"
import fotoApartamento from "../../assets/Images/fotoApartamento.jpg"
import fotoHotel from "../../assets/Images/fotoHotel.jpg"
import CardOfertas from '../../components/CardOfertas/CardOfertas'
import { useEffect, useState } from 'react'

interface DataUser {
  ativo: boolean
  cpf: string
  email: string
  id: number
  name: string
  status: string
  telefone: string
}

interface DataAnnouncement {
  user: DataUser
  id: number
  titulo: string
  descricao: string
  preco: number
  tipoImovel: string
  endereco: string
  dataCadastro: string
  disponivel: boolean
  cidade: string
  avaliacao: number
  urlImage: FileList | null
}

const Home = () => {
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const [announcements, setAnnouncements] = useState<DataAnnouncement[] | null>([])
  const [homes, setHomes] = useState<DataAnnouncement[] | null>([])
  const [hotels, setHotels] = useState<DataAnnouncement[] | null>([])
  const [apartaments, setApartaments] = useState<DataAnnouncement[] | null>([])

  useEffect(() => {
    fetch("http://localhost:8080/top-anuncios").then(async (res) => {
      const data = await res.json()
      setAnnouncements(data)
    })
    fetch("http://localhost:8080/hoteis/bests").then(async (res) => {
      const data = await res.json()
      setHotels(data)
    })
    fetch("http://localhost:8080/casas/bests").then(async (res) => {
      const data = await res.json()
      setHomes(data)
    })
    fetch("http://localhost:8080/apartamentos/bests").then(async (res) => {
      const data = await res.json()
      setApartaments(data)
    })

  }, [token])

  return (
    <main className={styles.mainContainer}>
      <Header principalText='Encontre sua próxima estadia' secondaryText='Encontre ofertas em hotéis, casas, apartamentos e muito mais...' />
      <section className={styles.section}>
        <article>
          <h2>Tipos de acomodação</h2>
          <div className={styles.typesAcomo}>
            <Link to={"/anuncios/hoteis"}>
              <img src={fotoHotel} alt="Hotéis" />
              <p>Hotéis</p>
            </Link>
            <Link to={"/anuncios/casas"}>
              <img src={fotoCasa} alt="Casas" />
              <p>Casas</p>
            </Link>
            <Link to={"/anuncios/apartamentos"}>
              <img src={fotoApartamento} alt="Apartamentos" />
              <p>Apartamentos</p>
            </Link>
          </div>
        </article>
        <article className={styles.ofertasContainer}>
          <h2>Os mais bem avaliados</h2>
          <div className={styles.ofertas}>
            {announcements && announcements?.map((data) => (
              <CardOfertas key={data.id} id={data.id} titulo={data.titulo} preco={data.preco} localizacao={data.cidade} avaliacao={data.avaliacao} disponivel={data.disponivel} urlImage={data.urlImage} />
            ))}
          </div>
        </article>
        <article className={styles.ofertasContainer}>
          <h2>Os mais bem avaliados</h2>
          <h1>Hotéis</h1>
          <br />
          <div className={styles.bests}>
            {hotels && hotels?.map((data) => (
              <CardOfertas key={data.id} id={data.id} titulo={data.titulo} preco={data.preco} localizacao={data.cidade} avaliacao={data.avaliacao} disponivel={data.disponivel} urlImage={data.urlImage} />
            ))}
          </div>
          <h1>Casas</h1>
          <br />
          <div className={styles.bests}>
            {homes && homes?.map((data) => (
              <CardOfertas key={data.id} id={data.id} titulo={data.titulo} preco={data.preco} localizacao={data.cidade} avaliacao={data.avaliacao} disponivel={data.disponivel} urlImage={data.urlImage} />
            ))}
          </div>
          <h1>Apartamentos</h1>
          <br />
          <div className={styles.bests}>
            {apartaments && apartaments?.map((data) => (
              <CardOfertas key={data.id} id={data.id} titulo={data.titulo} preco={data.preco} localizacao={data.cidade} avaliacao={data.avaliacao} disponivel={data.disponivel} urlImage={data.urlImage} />
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default Home
