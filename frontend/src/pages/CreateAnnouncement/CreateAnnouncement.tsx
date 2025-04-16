import { useNavigate } from 'react-router-dom'
import styles from './CreateAnnouncement.module.scss'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAuthContext } from '../../context/UserContext'
import Header from '../../components/Header/Header'

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
    if (!authenticated) navigate("/login")
  }, [authenticated, navigate])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    console.log(token)
    create(announcement, token, navigate)

    console.log(announcement)
  }
  return (
    <main className={styles.containerCreate}>
      <Header tipo='' principalText='Vamos anúnciar...' secondaryText='Precisamos saber sobre seu imóvel para proceguir' />

      <form className={styles.formAnnouncement} onSubmit={handleSubmit}>
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
        <label>
          <input onChange={handleChange} type="text" name='avaliacao' placeholder='Avaliações' required />
        </label>
        <label>
          <input onChange={handleChange} type="text" name='cidade' placeholder='Cidade' required />
        </label>
        <label>
          <input onChange={handleChange} type="file" name='urlImage' required />
        </label>
        <button type='submit'>Anúnciar</button>
      </form>
    </main>
  )
}

export default CreateAnnouncement
