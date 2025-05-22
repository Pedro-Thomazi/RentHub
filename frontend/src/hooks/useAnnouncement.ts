import { NavigateFunction } from "react-router-dom"

interface DataAnnouncement {
  titulo: string
  descricao: string
  preco: number
  tipoImovel: string
  endereco: string
  cidade: string
  avaliacao: number
  principalImage: FileList | null
}


export default function useAnnouncement() {

  async function create(announcement: DataAnnouncement, token: string, navigate: NavigateFunction) {
    if (announcement.principalImage) {
      console.log(announcement.principalImage[0])
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

      if (announcement.principalImage && announcement.principalImage[0]) {
        formData.append("urlImage", announcement.principalImage[0]); // Pega o primeiro item do FileList
      } else {
        alert("Selecione uma imagem.");
        return;
      }

      console.log(announcement)

      await fetch("http://localhost:8080/create-anuncio", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: formData
      })

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      await navigate("/dashboard")
    } catch (error) {
      console.error("Erro: " + error)
      alert("Erro na criação do anúncio.")
    }
  }

  async function update(id: number, announcement: DataAnnouncement, token: string, navigate: NavigateFunction) {
    if (announcement.principalImage) {
      console.log(announcement.principalImage[0])
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

      if (announcement.principalImage && announcement.principalImage[0]) {
        formData.append("urlImage", announcement.principalImage[0]); // Pega o primeiro item do FileList
      } else {
        alert("Selecione uma imagem.");
        return;
      }

      console.log(announcement)

      await fetch(`http://localhost:8080/update-anuncio/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: formData
      })

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      await navigate("/dashboard")
    } catch (error) {
      console.error("Erro: " + error)
      alert("Erro na criação do anúncio.")
    }
  }

  return {
    create,
    update
  }
}