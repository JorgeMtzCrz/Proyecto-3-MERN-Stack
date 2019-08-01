import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import AuthService from '../services/auth'

const { Header, Content, Footer } = Layout

const LayoutP = props => {
  const authService = new AuthService()
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        localStorage.removeItem('loggedUser')
        props.history.push('/login')
      })
      .catch(err => console.log(err))
  }
  if (!loggedUser)
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/signup">Sign Up</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`/universidades`}>Universidades</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ width: '100vw' }}>
          <div style={{ background: '#fff', padding: 50, minHeight: 570 }} className="principal">
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Iron Hack ©2019 Tonalá 10 Roma Norte</Footer>
      </Layout>
    )
  if (loggedUser && loggedUser.role === 'UNIVERSITY')
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/profile/university/${loggedUser._id}`}>Perfil</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={`/universidades`}>Universidades</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`/profile/university/${loggedUser._id}/addcarreer`}>Añadir Carrera</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <span onClick={handleLogout}>Cerrar Sesión</span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ width: '100vw' }}>
          <div style={{ background: '#fff', padding: 30, minHeight: 570 }} className="principal">
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Iron Hack ©2019 Tonalá 10 Roma Norte</Footer>
      </Layout>
    )
  if (loggedUser && loggedUser.role === 'USER')
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/profile/${loggedUser._id}`}>Perfil</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`/universidades`}>Universidades</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <span onClick={handleLogout}>Cerrar Sesión</span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ width: '100vw' }}>
          <div style={{ background: '#fff', padding: 30, minHeight: 550 }} className="principal">
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Iron Hack ©2019 Tonalá 10 Roma Norte</Footer>
      </Layout>
    )
}

export default withRouter(LayoutP)
