import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Descriptions, Button } from 'antd'
import Swal from 'sweetalert2'

import LayoutP from './LayoutP'

const PerfilUniversity = props => {
  const [university, setUniversity] = useState({
    userId: ''
  })
  const [carreer, setCarreer] = useState([])
  const [user, setUser] = useState({})
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

  useEffect(() => {
    axios
      .get(`https://diegoye.herokuapp.com/perfil/${props.match.params.id}`)
      .then(({ data }) => {
        setUser(prevState => {
          return {
            ...prevState,
            ...data.user
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [props.match.params.id])
  const followers = user.followers

  const userId = university.userId

  if (!userId.name || !followers) return <p>Loading</p>
  return (
    <LayoutP>
      <h2>Bienvenido</h2>
      <img src={userId.imgProfile} alt={userId.name} width="200" height="150" />
      
      <br />
      <br />
      <Descriptions title="Información de Usuario">
        <Descriptions.Item label="Nombre">{userId.name}</Descriptions.Item>
        <Descriptions.Item label="Teléfono">{university.telephone}</Descriptions.Item>
        <Descriptions.Item label="Correo electrónico">{userId.email}</Descriptions.Item>
        <Descriptions.Item label="Tipo">{university.typeSocial}</Descriptions.Item>
        <Descriptions.Item label="Dirección">{university.address}</Descriptions.Item>
        <Descriptions.Item label="Misión">{university.mision}</Descriptions.Item>
        <Descriptions.Item label="Visión">{university.vision}</Descriptions.Item>
        <Descriptions.Item label="Objetivo">{university.objetivo}</Descriptions.Item>
      </Descriptions>
      <Link to={`/updateU/${userId._id}`}>Editar</Link>
      <br />
      <br />
      <Descriptions title="Carreras en tu Institución">
        {carreer.map(carreer => {
          return (
            <Descriptions.Item key={carreer._id} label="Nombre">
              {carreer.name}
              &nbsp;&nbsp;
              <Button to={`/updateC/${carreer._id}`}>Editar</Button>
              &nbsp;&nbsp;
              <Button
                onClick={e =>
                  axios
                    .delete(`https://diegoye.herokuapp.com/carreer/${carreer._id}`)
                    .then(({ data }) => {
                      Swal.fire('Eliminado', data.msg, 'success')
                      props.history.push(`/profile/university/${props.match.params.id}`)
                      setCarreer(prevState => {
                        return prevState.filter(e => e._id !== data.carreer._id)
                      })
                    })
                    .catch(err => {
                      console.log(err)
                      Swal.fire(err)
                    })
                }
              >
                Eliminar
              </Button>
              
              
            </Descriptions.Item>
          )
        })}
      </Descriptions>
      <Descriptions title="Tus seguidores">
        
        {followers.length === 0 ?  <p>Aún no tienes seguidores:(</p> :
          followers.map((follower, i) => {
          
          return (
            <Descriptions.Item key={follower._id} label="Nombre">
              {follower.name}
              &nbsp;&nbsp;
              <Link to={`/profile/${follower._id}`}>Perfil</Link>
            </Descriptions.Item>
          )
        })}
      </Descriptions>
    </LayoutP>
  )
}

export default PerfilUniversity
