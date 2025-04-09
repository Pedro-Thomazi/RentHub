import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/UserContext'
import styles from './UpdateUser.module.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { FaRegUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface DataUser {
  name: string
  email: string
  status: string
  telefone: string
  cpf: string
}


const UpdateUser = () => {
  const { authenticated, updateUser } = useAuthContext()
  const [user, setUser] = useState<DataUser>({
      name: "",
      email: "",
      status: "",
      telefone: "",
      cpf: "",
    })
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const navigate = useNavigate()

  useEffect(() => {

    if (!authenticated) navigate("/login")

    if (token) {
      axios.get("http://localhost:8080/my-details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((res) => {
        console.log(res.data)
        setUser(res.data)
      })
      console.log(user)
    }
  }, [token])

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e:FormEvent) {
      e.preventDefault()
  
      updateUser(user, token, navigate)
    }

  return (
    <main className={styles.updateUserContainer}>
      <form onSubmit={handleSubmit}>
        <h1>Atualizar meu dados.</h1>
        <p>Algumas informações não podem ser alteradas.</p>
        <label>
          <FaRegUser />
          <input onChange={handleChange} type="text" name='name' placeholder='Nome' value={user?.name} required />
        </label>
        <label>
          <MdEmail />
          <input type="email" name='email' disabled placeholder='E-mail' value={user?.email} required />
        </label>
        <label>
          <FaRegUser />
          <input  type="text" name='status' disabled placeholder='Status' value={user?.status} required />
        </label>
        <label>
          <FaRegUser />
          <input type="text" name='cpf' disabled placeholder='CPF' value={user?.cpf} required />
        </label>
        <label>
          <FaPhoneAlt />
          <input onChange={handleChange} type="text" name='telefone' placeholder='Telefone' value={user?.telefone} required />
        </label>
        <button type='submit'>Enviar</button>
      </form>
    </main>
  )
}

export default UpdateUser
