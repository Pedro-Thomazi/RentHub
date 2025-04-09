import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import styles from './CreateAnnouncement.module.scss'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAuthContext } from '../../context/UserContext'

interface DataAnnouncement {
  titulo: string
  descricao: string
  preco: number
  tipoImovel: string
  endereco: string
  avaliacao: number
  cidade: string
}

const CreateAnnouncement = () => {
  const { authenticated, create } = useAuthContext()
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const [announcement, setAnnouncement] = useState<DataAnnouncement>({
    titulo: "",
    descricao: "",
    preco: 0,
    tipoImovel: "",
    endereco: "",
    avaliacao: 0,
    cidade: ""
  })
  const navigate = useNavigate()

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (authenticated) navigate("/")
  }, [authenticated, navigate])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    console.log(token)
    create(announcement, token, navigate)

    console.log(announcement)
  }
  return (
    <main className={styles.containerCreate}>
      <header>
        <Logo />
        <Link className={styles.linkToDashboard} to={"/dashboard"}>Voltar</Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>O que você quer anúnciar?</h1>
        <label>
          <input onChange={handleChange} type="text" name='titulo' placeholder='Título' required />
        </label>
        <label>
          <input onChange={handleChange} type="text" name='descricao' placeholder='Descrição' required />
        </label>
        <label>
          <input onChange={handleChange} type="number" step={"0.010"} name='preco' placeholder='Preço' required />
        </label>
        <label>
          <select onChange={handleChange} name="tipoImovel" id="tipoImovel">
            <option value="**" selected disabled>ESCOLHA</option>
            <option value="HOTEL">HOTEL</option>
            <option value="CASA">CASA</option>
            <option value="APARTAMENTO">APARTAMENTO</option>
          </select>
        </label>
        <label>
          <input onChange={handleChange} type="text" name='endereco' placeholder='Endereço' required />
        </label>
        <button type='submit'>Anúnciar</button>
      </form>
    </main>
  )
}

export default CreateAnnouncement
