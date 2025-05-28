import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'

// Icons
import { BsList } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import { FaSearch, FaUserCircle } from "react-icons/fa";

import Logo from '../Logo/Logo';
import { useAuthContext } from '../../context/UserContext';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface DataUser {
  name: string
  email: string
}

interface DataHeaderText {
  tipo?: string
  principalText: string
  secondaryText: string
}

const Header = ({ tipo, principalText, secondaryText }: DataHeaderText) => {
  const { authenticated } = useAuthContext()
  const [user, setUser] = useState<DataUser>({
    name: "",
    email: "",
  })
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const [openSearch, setOpenSearch] = useState<string>("")
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>("")

  function openSearchMenu() {
    if (openSearch == "") {
      setOpenSearch(styles.open)
    }
    else {
      setOpenSearch("")
    }
  }

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

  function getDynamicText() {
    switch (tipo) {
      case "hoteis":
        return "Hotéis disponíveis."
      case "casas":
        return "Casas disponíveis."
      case "apartamentos":
        return "Apartamentos disponíveis."
      default:
        return principalText || ""
    }
  }

  function getDynamicNavbar() {
    switch (tipo) {
      case "hoteis":
        return (
          <nav className={styles.secondyNavbar}>
            <Link to={"/anuncios/casas"}>Casas</Link>
            <Link to={"/anuncios/apartamentos"}>Apartamentos</Link>
          </nav>
        )
      case "casas":
        return (
          <nav className={styles.secondyNavbar}>
            <Link to={"/anuncios/hoteis"}>Hotéis</Link>
            <Link to={"/anuncios/apartamentos"}>Apartamentos</Link>
          </nav>
        )
      case "apartamentos":
        return (
          <nav className={styles.secondyNavbar}>
            <Link to={"/anuncios/hoteis"}>Hotéis</Link>
            <Link to={"/anuncios/casas"}>Casas</Link>
          </nav>
        )
      default:
        return principalText || ""
    }
  }

  function search(e: FormEvent) {
    e.preventDefault()

    navigate("/anuncios/search?q=" + query)
  }

  return (
    <header className={styles.headerContainer}>
      <section className={styles.primarySection}>
        <Logo />
        <div className={styles.containerNavbar}>
          <BsList size={40} />
          <nav className={styles.navbar}>
            <Link to={"/"}>Alugar</Link>
            <Link to={"/criar-anuncio"}>Anúnciar</Link>

            <form onSubmit={search} className={`${styles.searchForm} ${openSearch}`}>
              <input type="search" onChange={(e:ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} name="search" id="search" placeholder='Buscar...' />
            </form>
            <FaSearch onClick={openSearchMenu} size={25} />
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
        <h1>{getDynamicText()}</h1>
        <h2>{secondaryText}</h2>
        {tipo && (getDynamicNavbar())}
      </section>
    </header>
  )
}

// Ideias -- https://br.pinterest.com/pin/1407443628028498/
// Ideias -- https://br.pinterest.com/pin/5348093303180436/

export default Header
