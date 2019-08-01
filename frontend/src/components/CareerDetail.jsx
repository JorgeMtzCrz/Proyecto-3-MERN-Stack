import React, { useEffect, useState } from 'react'

import LayoutP from './LayoutP'
import { Descriptions, Button } from 'antd'
import axios from 'axios'

const CareerDetail = props => {
  const [carreer, setCarreer] = useState({})
  useEffect(() => {
    axios
      .get(`https://diegoye.herokuapp.com/carreero/${props.match.params.id}`)
      .then(({ data }) => {
        setCarreer(prevState => {
          return { ...prevState, ...data.carreer }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [props.match.params.id])

  return (
    <LayoutP>
      <div>
        <br />
        <Descriptions bordered title={carreer.name} border>
          <Descriptions.Item label="Tipo de Curso">{carreer.typeCarreer}</Descriptions.Item>
          <Descriptions.Item label="Objetivo">{carreer.objetivo}</Descriptions.Item>
          <Descriptions.Item label="Perfil">{carreer.perfil}</Descriptions.Item>
          <Descriptions.Item label="Áreas de desarrollo">{carreer.areaLaboral}</Descriptions.Item>
          <Descriptions.Item label="Duración del Curso">{carreer.duration}</Descriptions.Item>
          <Descriptions.Item label="Alumnos inscritos actualmente">{carreer.matricula}</Descriptions.Item>
        </Descriptions>
        <br/>
        <br/>
        <Button onClick={()=>props.history.goBack()}>Regresar</Button> 
      </div>
    </LayoutP>
  )
}

export default CareerDetail
