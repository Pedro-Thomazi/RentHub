import { NavigateFunction } from "react-router-dom"

interface DataAnnouncement {
  titulo: string
  descricao: string
  preco: number
  tipoImovel: string
  endereco: string
  cidade: string
  avaliacao: number
  urlImage: FileList | null
}


export default function useAnnouncement() {

  async function create(announcement: DataAnnouncement, token: string, navigate: NavigateFunction) {
    if (announcement.urlImage) {
      console.log(announcement.urlImage[0])
    }

    const formData = new FormData()

    try {
      formData.append("titulo", announcement.titulo);
      formData.append("descricao", announcement.descricao);
      formData.append("preco", String(announcement.preco));
      formData.append("tipoImovel", announcement.tipoImovel);
      formData.append("endereco", announcement.endereco);
      formData.append("cidade", announcement.cidade);
      formData.append("avaliacao", String(announcement.avaliacao));
      if (announcement.urlImage) {
        for (let i = 0; i < announcement.urlImage.length; i++) {
          formData.append('urlImage', announcement.urlImage[i])
        }
      }

      await fetch("http://localhost:8080/create-anuncio", {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: formData
      })
      console.log(formData)
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