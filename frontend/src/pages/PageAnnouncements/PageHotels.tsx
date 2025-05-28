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
  principalImage: FileList | null
}

const PageHotels = () => {
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const [hotels, setHotels] = useState<DataAnnouncement[] | null>([])

  useEffect(() => {
    fetch("http://localhost:8080/hoteis").then(async (res) => {
      const data = await res.json()
      setHotels(data)
    })

  }, [token])
  return (
    <div className={styles.ofertas}>
      {hotels && hotels?.map((data) => (
        <CardOfertas key={data.id} id={data.id} titulo={data.titulo} preco={data.preco} localizacao={data.cidade} avaliacao={data.avaliacao} disponivel={data.disponivel} urlImage={data.principalImage} url={`/${data.titulo}/${data.id}`} />
      ))}
    </div>
  )
}

export default PageHotels
