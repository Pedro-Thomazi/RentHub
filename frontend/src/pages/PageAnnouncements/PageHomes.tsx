import { useEffect, useState } from 'react'
import styles from './PageAnnouncements.module.scss'
import CardOfertas from '../../components/CardOfertas/CardOfertas'

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
  urlImage: string
}
const PageHomes = () => {
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const [homes, setHomes] = useState<DataAnnouncement[] | null>([])

  useEffect(() => {
    fetch("http://localhost:8080/casas").then(async (res) => {
      const data = await res.json()
      setHomes(data)
    })

  }, [token])
  return (
    <div className={styles.ofertas}>
      {homes && homes?.map((data) => (
        <CardOfertas key={data.id} id={data.id} titulo={data.titulo} preco={data.preco} localizacao={data.cidade} avaliacao={data.avaliacao} disponivel={data.disponivel} urlImage={data.urlImage} />
      ))}
    </div>
  )
}

export default PageHomes
