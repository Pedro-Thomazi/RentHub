import { NavigateFunction } from "react-router-dom"

interface DataAnnouncement {
  titulo: string
  descricao: string
  preco: number
  tipoImovel: string
  endereco: string
  cidade: string
  avaliacao: number
}

type DataImage = File[] | null


export default function useAnnouncement() {

  async function create(announcement: DataAnnouncement, urlImage: DataImage, token: string, navigate: NavigateFunction) {
    if (urlImage) {
      console.log(urlImage)
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

      if (urlImage && urlImage.length > 0) {
        Array.from(urlImage).forEach(file => {
          console.log("Dentro do for" + file)
          formData.append("urlImage", file)
        })
      } else {
        alert("Selecione uma imagem.");
        return;
      }

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

  async function update(id: number, announcement: DataAnnouncement, urlImage: DataImage, token: string, navigate: NavigateFunction) {
    if (urlImage) {
      console.log(urlImage)
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

      if (urlImage && urlImage.length > 0) {
        Array.from(urlImage).forEach(file => {
          console.log("Dentro do for" + file)
          formData.append("urlImage", file)
        })
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

  async function desative(id: number, token: string, navigate: NavigateFunction) {
    await fetch(`http://localhost:8080/unavailable-anuncio/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })

    await navigate("/dashboard")
  }

  return {
    create,
    update,
    desative
  }
}