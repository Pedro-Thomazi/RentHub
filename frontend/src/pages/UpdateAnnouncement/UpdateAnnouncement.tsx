import { useParams } from 'react-router-dom'
import styles from './UpdateAnnouncement.module.scss'

const UpdateAnnouncement = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <div>
      <h1>Atualizar essa merda</h1>
    </div>
  )
}

export default UpdateAnnouncement
