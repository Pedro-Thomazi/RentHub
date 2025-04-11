import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

// Icons
import { BsList } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import Logo from '../Logo/Logo';
import { useAuthContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DataUser {
  name: string
  email: string
}

const Header = () => {
  const { authenticated } = useAuthContext()
  const [user, setUser] = useState<DataUser>({
    name: "",
    email: "",
  })
  const [token] = useState<string>(localStorage.getItem("token") || "")

  useEffect(() => {

    if (token) {
      axios.get("http://localhost:8080/my-details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((res) => {
        setUser({
          name: res.data.name,
          email: res.data.email
        })
      })
    }
  }, [token])

  return (
    <header className={styles.headerContainer}>
      <section className={styles.primarySection}>
        <Logo />
        <div className={styles.containerNavbar}>
          <BsList size={40} />
          <nav className={styles.navbar}>
            <Link to={"/"}>Alugar</Link>
            <Link to={"/criar-anuncio"}>Anúnciar</Link>
          </nav>
        </div>
        {authenticated ? (
          <Link className={styles.linkLogin} to={"/dashboard"}>
            <FaUserCircle size={40} />
            <p>{user?.name}</p>
          </Link>
        ) : (
          <Link className={styles.linkLogin} to={"/login"}>
            <MdLogin size={40} />
            <p>Login</p>
          </Link>
        )}
      </section>
      <section className={styles.secondarySection}>
        <h1>Encontre sua próxima estadia</h1>
        <h2>Encontre ofertas em hotéis, casas, apartamentos e muito mais...</h2>
      </section>
    </header>
  )
}

// Ideias -- https://br.pinterest.com/pin/1407443628028498/
// Ideias -- https://br.pinterest.com/pin/5348093303180436/

export default Header
