import React, { useState, useEffect } from 'react'

import axios from 'axios'
import LayoutP from './LayoutP'

const Perfil = props => {
  const [user, setUser] = useState({})
  useEffect(() => {
    axios
      .get(`https://aun-no-se.herokuapp.com/perfil/${props.match.params.id}`)
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
  return (
    <LayoutP>
      <h2>Bienvenido {user.name}</h2>
      <img src={user.imgProfile} alt={user.name} width="200" height="150" />
    </LayoutP>
  )
}

export default Perfil
