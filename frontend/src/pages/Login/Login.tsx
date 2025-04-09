import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './Login.module.scss'

// icons
import { FaFacebookF, FaLinkedinIn, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { useAuthContext } from '../../context/UserContext';

interface DataLogin {
  email: string
  password: string
}

const Login = () => {
  const { authenticated, login } = useAuthContext()
  const [user, setUser] = useState<DataLogin>({
    email: "",
    password: ""
  })
  const [showPass, setShowPass] = useState("")
  const [hidePass, setHidePass] = useState(styles.hide)
  const [teste, setTeste] = useState('password')
  const navigate = useNavigate()

  function handleChange(e:ChangeEvent<HTMLInputElement>): void {
    setUser({...user, [e.target.name]: e.target.value})
  }

  function handleSubmit(e:FormEvent) {
    e.preventDefault()

    login(user, navigate)
  }

  useEffect(() => {
    if (authenticated) navigate("/")
  }, [authenticated, navigate])


  function showPassword() {
    setShowPass(styles.hide)
    setHidePass('')
    setTeste("text")
  }

  function hidePassword() {
    setShowPass("")
    setHidePass(styles.hide)
    setTeste("password")
  }

  return (
    <main className={styles.loginContainer}>
      <section className={styles.container}>
        <article>
          <div className={styles.logo}>
            <Logo />
          </div>
          <h1>Bem-vindo de volta!</h1>
          <p>Para conectar-se, faça o seu Login com suas informações. <br />Se ainda não tiver uma conta: </p>
          <Link className={styles.link} to={"/register"}>Register-se</Link>
        </article>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
            <input onChange={handleChange} type="email" name='email' placeholder='E-mail' required />
          </label>
          <label>
            <FaLock />
            <input onChange={handleChange} type={teste} name='password' placeholder='Senha' required />
            <FaEye onClick={showPassword} className={showPass} />
            <FaEyeSlash onClick={hidePassword} className={hidePass} />
          </label>

          <button type='submit'>Entrar</button>
        </form>
      </section>
    </main>
  )
}


// Ideia -- https://br.pinterest.com/pin/123708321008353916/
// Video -- https://www.youtube.com/watch?v=PlpM2LJWu-s

export default Login
