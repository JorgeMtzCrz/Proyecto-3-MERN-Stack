import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LayoutP from './LayoutP'
import { Descriptions, Icon, Button } from 'antd'
import axios from 'axios'
import Swal from 'sweetalert2'

const UniversidadDetail = props => {
  const [university, setUniversity] = useState({
    userId: ''
  })
  const [carreer, setCarreer] = useState([])
  const [follow, setFollow] = useState([])

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

  useEffect(() => {
    axios
      .get(`https://diegoye.herokuapp.com/detailU/${props.match.params.id}`)
      .then(({ data }) => {
        setUniversity(prevState => {
          return {
            ...prevState,
            ...data.university
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [props.match.params.id])

  useEffect(() => {
    axios
      .get(`https://diegoye.herokuapp.com/carreer/${props.match.params.id}`)
      .then(({ data }) => {
        setCarreer(prevState => {
          return [...prevState, ...data.carreer]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [props.match.params.id])

  const follow2 = props => {
    axios
      .patch(`https://diegoye.herokuapp.com/follow/${loggedUser._id}`, { id2: userId._id })
      .then(({ data: { follow, msg } }) => {
        setFollow(prevState => [...prevState, follow])
        Swal.fire('Todo salió bien', msg, 'success')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const userId = university.userId

  if (!userId.name) return <p>Loading</p>
  return (
    <LayoutP>
      <br />
      <Descriptions bordered title={userId.name} border value="small">
        <Descriptions.Item label="Teléfono">{university.telephone}</Descriptions.Item>
        <Descriptions.Item label="Tipo">{university.typeSocial}</Descriptions.Item>
        <Descriptions.Item label="Correo Electrónico">{userId.email}</Descriptions.Item>
        <Descriptions.Item label="Misión">{university.mision}</Descriptions.Item>
        <Descriptions.Item label="Visión">{university.vision}</Descriptions.Item>
        <Descriptions.Item label="Objetivo">{university.objetivo}</Descriptions.Item>
        <Descriptions.Item label="Dirección">{university.address}</Descriptions.Item>
        <Descriptions.Item label="Cursos de esta Institución">
          {carreer.map(carreer => (
            <ul key={carreer._id}>
              <Link to={`/career/${carreer._id}`}>
                <li>{carreer.name}</li>
              </Link>
            </ul>
          ))}
        </Descriptions.Item>
      </Descriptions>
      {!loggedUser ? (
        <p>Para seguir a la Institución Inicia Sesión</p>
      ) : follow.includes(userId._id) ? (
        <p>Ya sigues a este usuario</p>
      ) : (
        <p>
          <Icon onClick={follow2} type="heart" />
          Seguir a {userId.name}
        </p>
      )}
      <Button onClick={() => props.history.goBack()}>Regresar</Button>
    </LayoutP>
  )
}

export default UniversidadDetail
