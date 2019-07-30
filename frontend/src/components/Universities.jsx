import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LayoutP from './LayoutP'
import { Card } from 'antd'

const { Meta } = Card

const Universities = props => {
  const [user, setUser] = useState([])
  useEffect(() => {
    axios
      .get(`https://aun-no-se.herokuapp.com/universities`)
      .then(({ data }) => {
        setUser(prevState => {
          return [...prevState, ...data.user]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  console.log(user)

  return (
    <LayoutP>
      <div className="principal2">
        {user.map(user => {
          return (
            <Card  key={user._id} hoverable style={{ width: 240, marginTop:20 }} cover={<img alt={user.name} src={user.imgProfile} />}>
              <Meta title={user.name} description={user.email} />
            </Card>
          )
        })}
      </div>
    </LayoutP>
  )
}

export default Universities
