import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import LayoutP from './LayoutP'
import AuthService from '../services/auth'
const authService = new AuthService()

class NormalLoginForm extends React.Component {
  componentDidMount(props) {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) return this.props.history.push('/')
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        authService
          .login(this.state)
          .then(response => {
            //aquí deberia ir una notificacion o un swal o un toastr

            localStorage.setItem('loggedUser', JSON.stringify(response.data.user))
            if (response.data.user.role === 'USER') {
              this.props.history.push(`/profile/${response.data.user._id}`)
            }
            if (response.data.user.role === 'UNIVERSITY') {
              this.props.history.push(`/profile/university/${response.data.user._id}`)
            }
          })
          .catch(err => {
            alert('Usuario o Contraseña Incorrecta')
          })
      }
    })
  }
  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <LayoutP>
        <div className="loginU">
          <h2>Inicia Sesión</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Por favor ingresa tu Correo Electrónico' }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="email"
                  id="email"
                  onChange={this.handleInput}
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Por favor ingresa tu contraseña' }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleInput}
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              O <Link to="/signup">Registrate ahora</Link>
            </Form.Item>
          </Form>
        </div>
      </LayoutP>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

export default WrappedNormalLoginForm
