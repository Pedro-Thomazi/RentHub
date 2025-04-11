import styles from './CardMessages.module.scss'

interface DataMessage {
  msg: string
  status: string
}

const CardMessages = ({msg, status}: DataMessage) => {
  return (
    <div className={`${styles.cardMessage} ${status == "404" && styles.error404}`}>
      {msg}
    </div>
  )
}

export default CardMessages
