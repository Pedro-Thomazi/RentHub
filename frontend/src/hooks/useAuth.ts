import axios from "axios";
import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";

interface DataToken {
  token: string
}

interface DataLogin {
  email: string
  password: string
}

interface DataRegister {
  name: string
  email: string
  telefone: string
  cpf: string
  password: string
  confirmPassword: string
}

interface DataUserUpdate {
  name: string
  telefone: string
  cpf: string
}


export default function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.stringify(token)}`

      setAuthenticated(true)

      const logoutTimer = setTimeout(() => {
        setAuthenticated(false)

        localStorage.removeItem("token")
        delete axios.defaults.headers.common["Authorization"]
      }, 30 * 60 * 1000)

      return () => clearTimeout(logoutTimer)
    }
  }, [])

  async function authUser(data:DataToken) {
    setAuthenticated(true)

    localStorage.setItem("token", JSON.stringify(data.token))
  }

  async function login(user:DataLogin, navigate: NavigateFunction) {
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      if (!res.ok) {
        throw new Error("Erro ao fazer o Login!")
      }

      const data = await res.json()
      await authUser(data)
      await navigate("/")
    } catch(error) {
      alert("Erro no Login: " + error)
    }
  }

  async function register(user:DataRegister, navigate: NavigateFunction) {
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      if (!res.ok) {
        throw new Error("Erro ao fazer o registro!")
      }

      const data = await res.json()
      await authUser(data)
      await navigate("/")
    } catch(error) {
      alert("Erro no registro: " + error)
    }
  }

  async function updateUser(user:DataUserUpdate, token:string, navigate: NavigateFunction) {
    try {
      const res = await fetch("http://localhost:8080/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: JSON.stringify(user)
      })

      if (!res.ok) {
        throw new Error("Erro ao atualizar o usuário!")
      }

      await navigate("/dashboard")
    } catch(error) {
      alert("Erro na atualização do usuário: " + error)
    }
  }

  async function logout() {
    setAuthenticated(false)

    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    window.location.reload()
  }

  return {
    authenticated,
    login,
    register,
    logout,
    updateUser
  }
}