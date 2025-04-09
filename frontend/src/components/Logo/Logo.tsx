import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
// images
import logo from "../../assets/Images/logo.png"

const Logo = () => {
  return (
    <Link className={styles.logo} to={"/"}>
      <img src={logo} alt="Logo RentHub" />
      <span>RentHub.com</span>
    </Link>
  )
}

export default Logo
