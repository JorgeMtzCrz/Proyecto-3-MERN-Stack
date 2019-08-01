import { useState } from 'react'
import axios from 'axios'

export default () => {
  const [form, setForm] = useState({})

  const handleInput = e => {
    e.persist()
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  // const uploadPhoto = async e => {
  //   const file = new FormData()
  //   file.append('photo', e.target.files[0])

  //   const {
  //     data: { img }
  //   } = await axios.post('https://diegoye.herokuapp.com/upload', file)
  //   setForm(prevState => ({ ...prevState, img }))
  // }

  return [form, handleInput]
}
