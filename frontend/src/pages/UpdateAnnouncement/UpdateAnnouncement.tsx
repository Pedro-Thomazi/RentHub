import { useNavigate, useParams } from 'react-router-dom'
import styles from './UpdateAnnouncement.module.scss'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAuthContext } from '../../context/UserContext'
import Header from '../../components/Header/Header'

interface DataAnnouncement {
  id: number
  titulo: string
  descricao: string
  preco: number
  tipoImovel: string
  endereco: string
  avaliacao: number
  cidade: string
}


const UpdateAnnouncement = () => {
  const { authenticated, update, desative } = useAuthContext()
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const [announcement, setAnnouncement] = useState<DataAnnouncement>({
    id: 0,
    titulo: "",
    descricao: "",
    preco: 0,
    tipoImovel: "",
    endereco: "",
    avaliacao: 0,
    cidade: ""
  })
  const [previewImg, setPreviewImg] = useState<File[]>([])
  const [opennig, setOpennig] = useState<boolean>(false)
  const [img, setImg] = useState<string>("")
  const [urlImage, setUrlImage] = useState<File[] | null>(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/anuncios/anuncio/${id}`).then(async (res) => {
      const data = await res.json()
      setAnnouncement(data)
      setImg(`http://localhost:8080/uploads/images/${data.urlImage}`)
    })
  }, [token])

  useEffect(() => {
    if (!authenticated) navigate("/login")
  }, [authenticated, navigate])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value })
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPreviewImg(Array.from(e.target.files))
      setUrlImage(Array.from(e.target.files))
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    update(announcement.id, announcement, urlImage, token, navigate)
  }

  function openPopup() {
    setOpennig(true)
  }

  function closePopup() {
    setOpennig(false)
  }
  return (
    <main className={styles.containerCreate}>
      <Header tipo='' principalText='Hora da manutenção...' secondaryText={`O que está de errado com ${announcement?.titulo}`} />

      <form className={styles.formAnnouncement} onSubmit={handleSubmit}>
        <h1>O que você quer anúnciar?</h1>
        <label>
          <input value={announcement.titulo} onChange={handleChange} type="text" name='titulo' placeholder='Título' required />
        </label>
        <label>
          <input value={announcement.descricao} onChange={handleChange} type="text" name='descricao' placeholder='Descrição' required />
        </label>
        <label>
          <input value={announcement.preco} onChange={handleChange} type="number" step={"0.010"} name='preco' placeholder='Preço' required />
        </label>
        <label>
          <select value={announcement.tipoImovel} onChange={handleChange} name="tipoImovel" id="tipoImovel">
            <option value="**" selected disabled>ESCOLHA</option>
            <option value="HOTEL">HOTEL</option>
            <option value="CASA">CASA</option>
            <option value="APARTAMENTO">APARTAMENTO</option>
          </select>
        </label>
        <label>
          <input value={announcement.endereco} onChange={handleChange} type="text" name='endereco' placeholder='Endereço' required />
        </label>
        <label>
          <input value={announcement.avaliacao} onChange={handleChange} type="text" name='avaliacao' placeholder='Avaliações' required />
        </label>
        <label>
          <input value={announcement.cidade} onChange={handleChange} type="text" name='cidade' placeholder='Cidade' required />
        </label>
        <label>
          <input onChange={handleImage} type="file" name='urlImage' required />
        </label>
        <div className={styles.containerImagesPrev}>
          {previewImg.map((image, index) => (
            <img className={styles.imgPreview} src={URL.createObjectURL(image)} alt={`Minha foto ${index + 1}`} key={index} />
          ))}
          <img className={styles.imgPreview} src={img} alt={`Minha foto`} />
        </div>
        <button type='submit'>Atualizar</button>
      </form>
      <button className={styles.btnDesative} onClick={openPopup}>Desativar anúncio</button>
      <div className={`${opennig ? styles.openPop : "" } ${styles.popup}`}>
        <h1>Desativar Anúncio</h1>
        <p>Você tem certeza que quer desativar esse anúncio</p>
        <div className={styles.actionsPop}>
          <button onClick={closePopup} className={`${styles.btnAction} ${styles.btnCancel}`}>Cancelar</button>
          <button onClick={() => desative(announcement?.id, token, navigate)} className={`${styles.btnAction} ${styles.btnDesativePop}`}>Desativar</button>
        </div>
      </div>
    </main>
  )
}

export default UpdateAnnouncement
