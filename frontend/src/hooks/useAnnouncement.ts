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

    try {
      formData.append("titulo", announcement.titulo);
      formData.append("descricao", announcement.descricao);
      formData.append("preco", String(announcement.preco));
      formData.append("tipoImovel", announcement.tipoImovel);
      formData.append("endereco", announcement.endereco);
      formData.append("cidade", announcement.cidade);
      formData.append("avaliacao", String(announcement.avaliacao));
      formData.append("image", announcement.urlImage);

      await fetch("http://localhost:8080/create-anuncio", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: formData
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