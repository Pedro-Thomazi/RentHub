import { NavigateFunction } from "react-router-dom"

interface DataAnnouncement {
  titulo: string
  descricao: string
  preco: number
  tipoImovel: string
  endereco: string
  cidade: string
  avaliacao: number
  urlImage: File
}


export default function useAnnouncement() {

  async function create(announcement: DataAnnouncement, token: string, navigate: NavigateFunction) {

    const formData = new FormData()

    await Object.keys(announcement).forEach((key) => {
      formData.append(key, announcement[key])
    })

    try {
      await fetch("http://localhost:8080/create-anuncio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: JSON.stringify(announcement)
      })
      await navigate("/dashboard")
    } catch (error) {
      console.error("Erro: " + error)
      alert("Erro na criação do anúncio.")
    }
  }

  return {
    create
  }
}