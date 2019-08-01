import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import LayoutP from './LayoutP'
import { Descriptions} from 'antd'

const Perfil = props => {
  const [user, setUser] = useState({})
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
  const follow = user.follow

  if (!follow) return <p>Loading</p>
  return (
    <LayoutP>
      <div className="principal3">
        <h2>Bienvenido {user.name}</h2>
        <img src={user.imgProfile} alt={user.name} width="200" height="150" />
        <br />
        <br />
        <Descriptions title="Siguiendo a">

        {follow.map((follow, i) => {
          return(
          <Descriptions.Item key={follow._id} label="Nombre">

              {follow.name}
              &nbsp;&nbsp;
              <Link to={`/universidad/${follow._id}`}>Perfil</Link>
            </Descriptions.Item>
          )
        })}
        </Descriptions>
      </div>
    </LayoutP>
  )
}

export default Perfil
