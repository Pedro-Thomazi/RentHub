import { useEffect, useState } from 'react'
import Logo from '../../components/Logo/Logo'
import { useAuthContext } from '../../context/UserContext'
import styles from './DetailsAnnouncement.module.scss'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { MdLogin } from 'react-icons/md'
import { FaLocationDot } from "react-icons/fa6";

interface DataUser {
  name: string
  email: string
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
  principalImage: File | null
}

const DetailsAnnouncement = () => {
  const { authenticated } = useAuthContext()
  const { id } = useParams()
  const [user, setUser] = useState<DataUser>({
    name: "",
    email: "",
  })
  const [announcement, setAnnouncement] = useState<DataAnnouncement | null>({
    user: {
      name: "",
      email: ""
    },
    id: 0,
    titulo: "",
    descricao: "",
    preco: 0,
    tipoImovel: "",
    endereco: "",
    dataCadastro: "",
    disponivel: false,
    cidade: "",
    avaliacao: 0,
    principalImage: null
  })

  const [images, setImages] = useState<string>("")
  const [token] = useState<string>(localStorage.getItem("token") || "")

  useEffect(() => {

    fetch(`http://localhost:8080/anuncios/anuncio/${id}`).then(async (res) => {
      const data = await res.json()
      setAnnouncement(data)
      console.log(data)
    })

    fetch(`http://localhost:8080/images/${id}`).then(async (res) => {
      const data = await res.json()
      setImages(data)
      console.log(data)
    })

    if (token) {
      axios.get("http://localhost:8080/my-details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((res) => {
        setUser({
          name: res.data.name,
          email: res.data.email
        })
      })
    }
  }, [token])
  return (
    <main className={styles.detailsContainer}>
      <header>
        <Logo />
        {authenticated ? (
          <Link className={styles.linkLogin} to={"/dashboard"}>
            <FaUserCircle size={40} />
            <p>{user?.name}</p>
          </Link>
        ) : (
          <Link className={styles.linkLogin} to={"/login"}>
            <MdLogin size={40} />
            <p>Login</p>
          </Link>
        )}
      </header>

      <section className={styles.announcement}>
        <h2 className={styles.title}>{announcement?.titulo}</h2>
        <p className={styles.localizacao}><FaLocationDot size={20} />{announcement?.endereco}</p>
        <div className={styles.content}>
          <div className={styles.images}>
            <img className={styles.principalImage} src={`http://localhost:8080/uploads/images/${announcement?.principalImage}`} alt="/" />
            <div className={styles.anotherImages}>
              <img src="/" alt="/" />
              <img src="/" alt="/" />
              <img src="/" alt="/" />
            </div>
          </div>
          <div className={styles.details}>
            <span className={styles.avaliacao}>
              <p className={styles.number}>{announcement?.avaliacao}</p>
              <p>Muito Bom . </p>
              <p>100+ avaliações</p>
            </span>
            <p className={styles.descricao}>{announcement?.descricao}</p>
            <div className={styles.propDetails}>
              <p>Proprietário: {announcement?.user.name}</p>
            </div>
          </div>
        </div>
        <button>Reservar agora</button>
      </section>
    </main>
  )
}

export default DetailsAnnouncement
