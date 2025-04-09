import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './Register.module.scss'

// icons
import { FaFacebookF, FaLinkedinIn, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../components/Logo/Logo';
import { useAuthContext } from '../../../context/UserContext';


interface DataRegister {
  name: string
  email: string
  telefone: string
  cpf: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const { authenticated, register } = useAuthContext()
  const [user, setUser] = useState<DataRegister>({
    name: "",
    email: "",
    telefone: "",
    cpf: "",
    password: "",
    confirmPassword: ""
  })


  const [showPass, setShowPass] = useState("")
  const [hidePass, setHidePass] = useState(styles.hide)
  const [showConfPass, setShowConfPass] = useState("")
  const [hideConfPass, setHideConfPass] = useState(styles.hide)
  const [statusPass, setStatusPass] = useState('password')
  const [statusCnfPass, setStatusConfPass] = useState('password')
  const navigate = useNavigate()

  function handleChange(e:ChangeEvent<HTMLInputElement>): void {
    setUser({...user, [e.target.name]: e.target.value})
  }

  function handleSubmit(e:FormEvent) {
    e.preventDefault()
    console.log(user)

    register(user, navigate)
  }

  useEffect(() => {
    if (authenticated) navigate("/")
  }, [authenticated, navigate])

  function showPassword() {
    setShowPass(styles.hide)
    setHidePass('')
    setStatusPass("text")
  }

  function hidePassword() {
    setShowPass("")
    setHidePass(styles.hide)
    setStatusPass("password")
  }

  function showConfPassword() {
    setShowConfPass(styles.hide)
    setHideConfPass('')
    setStatusConfPass("text")
  }

  function hideConfPassword() {
    setShowConfPass("")
    setHideConfPass(styles.hide)
    setStatusConfPass("password")
  }

  return (
    <main className={styles.loginContainer}>
      <section className={styles.container}>
        <article>
        <div className={styles.logo}>
            <Logo />
          </div>
          <h1>Bem-vindo!</h1>
          <p>Para conectar-se, crie uma conta com suas informações. <br />Já possui uma conta, clique abaixo: </p>
          <Link className={styles.link} to={"/login"}>Login</Link>
        </article>
        <form onSubmit={handleSubmit}>
          <h1>Criar Conta</h1>
          <div className={styles.socials}>
            <Link to={"/"}>
              <FaFacebookF />
            </Link>
            <Link to={"/"}>
              <FaLinkedinIn />
            </Link>
            <Link to={"/"}>
              <FaGooglePlusG />
            </Link>
          </div>
          <p>Coloque seu dados abaixo.</p>
          <label>
            <MdEmail />
            <input onChange={handleChange} type="text" name='name' placeholder='Nome' required />
          </label>
          <label>
            <MdEmail />
            <input onChange={handleChange} type="email" name='email' placeholder='E-mail' required />
          </label>
          <label>
            <MdEmail />
            <input onChange={handleChange} type="text" name='telefone' placeholder='Telefone' required />
          </label>
          <label>
            <MdEmail />
            <input onChange={handleChange} type="text" name='cpf' placeholder='CPF' required />
          </label>
          <label>
            <FaLock />
            <input onChange={handleChange} type={statusPass} name='password' placeholder='Senha' required />
            <FaEye onClick={showPassword} className={showPass} />
            <FaEyeSlash onClick={hidePassword} className={hidePass} />
          </label>
          <label>
            <FaLock />
            <input type={statusCnfPass} onChange={handleChange} name='confirmPassword' placeholder='Confirmação de Senha' required />
            <FaEye onClick={showConfPassword} className={showConfPass} />
            <FaEyeSlash onClick={hideConfPassword} className={hideConfPass} />
          </label>

          <button type='submit'>Entrar</button>
        </form>
      </section>
    </main>
  )
}

export default Register
