import { useSearchParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './PageSearch.module.scss'
import { useEffect, useState } from 'react'
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

const PageSearch = () => {
  const [announcements, setAnnouncements] = useState<DataAnnouncement[] | null>([])
  const [searchParams] = useSearchParams()

  const query = searchParams.get("q")

  console.log(query)

  useEffect(() => {
    if (!query) return

    fetch(`http://localhost:8080/search?query=${query}`)
      .then(async (res) => {
        const data = await res.json()
        setAnnouncements(data)
        console.log(announcements)
      }).catch(err => console.error("Ocorreu um erro ao buscar: " + err))

  }, [query])

  return (
    <>
      <Header principalText='Encontre sua próxima estadia' secondaryText='Encontre ofertas em hotéis, casas, apartamentos e muito mais...' />
      <main className={styles.mainContainer}>
        <article className={styles.ofertasContainer}>
          <h2>Encontrados em: "{query}"</h2>
          <div className={styles.ofertas}>
            {announcements && announcements?.map((data) => (
              <CardOfertas key={data.id} id={data.id} titulo={data.titulo} preco={data.preco} localizacao={data.cidade} avaliacao={data.avaliacao} disponivel={data.disponivel} urlImage={data.principalImage} url={`/${data.titulo}/${data.id}`} />
            ))}
          </div>
        </article>
      </main>
    </>
  )
}

export default PageSearch
