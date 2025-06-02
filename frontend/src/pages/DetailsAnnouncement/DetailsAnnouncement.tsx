import { useEffect, useState } from 'react'
import Logo from '../../components/Logo/Logo'
import { useAuthContext } from '../../context/UserContext'
import styles from './DetailsAnnouncement.module.scss'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { FaUserCircle, FaStar, FaStarHalfAlt } from 'react-icons/fa'
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

interface DataImages {
  idImage: number
  idAnuncio: number
  tituloAnuncio: string
  descricaoAnuncio: string
  tipoAnuncio: string
  nameImgFile: string
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

  const [images, setImages] = useState<DataImages[]>([])
  const [imgSetted, setImgSetted] = useState<string>("")
  const [token] = useState<string>(localStorage.getItem("token") || "")

  useEffect(() => {

    fetch(`http://localhost:8080/anuncios/anuncio/${id}`).then(async (res) => {
      const data = await res.json()
      setAnnouncement(data)
    })

    fetch(`http://localhost:8080/images/${id}`).then(async (res) => {
      const data = await res.json()
      setImages(data)
      setImgSetted(data[0].nameImgFile)
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

  function changeImg(index: number) {
    setImgSetted(images[index].nameImgFile)
  }

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
            <img className={styles.principalImage} src={`http://localhost:8080/uploads/images/${imgSetted}`} alt="/" />
            <div className={styles.anotherImages}>
              {images && images.map((data, index) => (
                <img key={data?.idImage} src={`http://localhost:8080/uploads/images/${data?.nameImgFile}`} alt={`Foto do anúncio ${data?.tituloAnuncio}`} onClick={() => changeImg(index)} />
              ))}
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

        <article className={styles.avaliations}>
          <h2>Avaliações</h2>
          <div className={styles.containerAvaliations}>
            <div className={styles.avaliation}>
              <img src="/" alt="Foto do usuário {nome}" />
              <div>
                <p className={styles.nameUser}>NOME_DO_USUÁRIO</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem quam id eos maxime ipsa error rem aliquid quaerat quo quod accusamus, facere atque totam deleniti harum alias autem eligendi numquam?</p>
                <span className={styles.qtyStars}>
                  <FaStar color='#FAAD1B' />
                  <FaStar color='#FAAD1B' />
                  <FaStar color='#FAAD1B' />
                  <FaStarHalfAlt color='#FAAD1B' />
                </span>
              </div>
            </div>
          </div>
          <form action="">
            <h3>Avaliar</h3>
            <textarea name="avaliation" id="avaliation" required></textarea>
            <input type="submit" value="Comentar" />
          </form>
        </article>
      </section>
    </main>
  )
}

export default DetailsAnnouncement
