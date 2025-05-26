import { createContext, ReactNode, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { NavigateFunction } from "react-router-dom";
import useAnnouncement from "../hooks/useAnnouncement";

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

interface AuthContextType {
  authenticated?: boolean
  login: (user: DataLogin, navigate: NavigateFunction) => Promise<void>
  register: (user: DataRegister, navigate: NavigateFunction) => Promise<void>
  updateUser: (user: DataUserUpdate, token: string, navigate: NavigateFunction) => Promise<void>
  logout: () => Promise<void>

  // Para o Anúncio
  create: (announcement: DataAnnouncement, urlImage: DataImage, token: string, navigate: NavigateFunction) => Promise<void>
  update: (id: number, announcement: DataAnnouncement, urlImage: DataImage, token: string, navigate: NavigateFunction) => Promise<void>
}

const Context = createContext<AuthContextType | undefined>(undefined)

function UserProvider({ children }: { children: ReactNode }) {
  const { authenticated, login, register, updateUser, logout } = useAuth()
  const { create, update } = useAnnouncement()

  return (
    <Context.Provider value={{ authenticated, login, register, updateUser, logout, create, update }}>
      {children}
    </Context.Provider>
  )
}

function useAuthContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("Erro no useAuthContext")
  }
  return context
}

export {
  Context,
  UserProvider,
  useAuthContext
}