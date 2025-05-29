import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/UserContext'
import styles from './Dashboard.module.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'

import { MdNotificationsActive, MdKingBed, MdHomeWork, MdExitToApp } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { BsList, BsTools } from "react-icons/bs";
import CardOfertas from '../../components/CardOfertas/CardOfertas'

interface DataUser {
  id: number
  name: string
  email: string
  status: string
  telefone: string
  cpf: string
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
  principalImage: FileList | null
}

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { authenticated, logout } = useAuthContext()
  const [user, setUser] = useState<DataUser>({
    id: 0,
    name: "",
    email: "",
    status: "",
    telefone: "",
    cpf: "",
  })
  const [myAnnouncements, setMyAnnouncements] = useState<DataAnnouncement[] | null>([])
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const navigate = useNavigate()

  useEffect(() => {

    if (!authenticated) navigate("/login")

    if (token) {
      axios.get("http://localhost:8080/my-details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((res) => {
        setUser(res.data)
      })

      fetch("http://localhost:8080/meus-anuncios", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then(async (res) => {
        const data = await res.json()
        setMyAnnouncements(data)
      })
    }
  }, [token])

  function actionMenuHamb() {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  return (
    <main className={styles.containeDashboard}>
      <header>
        <div className={styles.containerLogo}>
          <Logo />
          <button onClick={actionMenuHamb} className={styles.btnHamb}><BsList size={50} /></button>
          <div className={`${open ? styles.open : ""} ${styles.optionUser}`}>
            <button onClick={actionMenuHamb} className={styles.btnCloseHamb}><IoMdClose size={40} />Fechar</button>
            <Link to={"/atualizar-meus-dados"}><BsTools />Atualizar dados</Link>
            <button onClick={() => logout()} className={styles.btnLogout}><MdExitToApp />Sair</button>
          </div>
        </div>
        <h1>Olá, {user.name}</h1>
        <nav>
          <a href=""><MdKingBed /><span>Minhas reservas</span></a>
          <a href="#anuncios"><MdHomeWork /><span>Meus anúncios</span></a>
          <Link to={"/"}><MdNotificationsActive /><span>Notificações</span></Link>
        </nav>
      </header>
      <section id='anuncios' className={styles.myAnuncios}>
        <h2>Meus Anúncios</h2>
        <div>
          {myAnnouncements && myAnnouncements?.map((data) => (
            <CardOfertas key={data.id} id={data.id} titulo={data.titulo} preco={data.preco} localizacao={data.cidade} avaliacao={data.avaliacao} disponivel={data.disponivel} urlImage={data.principalImage} url={`/atualizar-anuncio/${data.titulo}/${data.id}`} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Dashboard
