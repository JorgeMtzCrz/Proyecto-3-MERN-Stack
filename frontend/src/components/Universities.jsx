import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LayoutP from './LayoutP'
import { Card } from 'antd'

const { Meta } = Card

const Universities = props => {
  const [user, setUser] = useState([])
  useEffect(() => {
    axios
      .get(`https://diegoye.herokuapp.com/universities`)
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
            <Link key={user._id} to={`/universidad/${user._id}`}>
              <Card
                hoverable
                style={{ width: 240,  marginTop: 20 }}
                cover={<img  alt={user.name} src={user.imgProfile} />}
              >
                <Meta title={user.name} description={user.email} />
              </Card>
            </Link>
          )
        })}
      </div>
    </LayoutP>
  )
}

export default Universities
