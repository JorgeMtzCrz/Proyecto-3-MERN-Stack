import React from 'react'
import { Form, Input, Tooltip, Icon, Button, Cascader } from 'antd'

import LayoutP from './LayoutP'
import AuthService from '../services/auth'
const authService = new AuthService()
const profile = [
  {
    value: 'Licenciatura',
    label: 'Licenciatura'
  },
  {
    value: 'Ingeniería',
    label: 'Ingeniería'
  },
  {
    value: 'Bootcamp',
    label: 'Bootcamp'
  }
]

class CarreerForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  }

  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  handleCascader = (value, field) => {
    this.setState(prevState => ({
      ...prevState,
      [field]: value[0]
    }))
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        authService
          .addCarreer(this.state)
          .then(response => {
            //aquí deberia ir una notificacion o un swal o un toastr
            this.props.history.push(`/profile/university/${this.props.match.params.id}`)
          })
          .catch(err => {
            //aquí deberia ir una notificacion o un swal o un toastr
            console.log(err.response)
            alert(err.response.data.msg || err.response.data.err.message)
          })
      }
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 15,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }

    return (
      <LayoutP>
        <div className="signU">
          <h2>Registro de Carrera</h2>
        </div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Tipo de Carrera">
            {getFieldDecorator('typeCarreer', {
              rules: [{ type: 'array', required: true, message: 'Por favor selecciona el tipo de Carrera' }]
            })(
              <Cascader
                options={profile}
                name="typeCarreer"
                onChange={values => this.handleCascader(values, 'typeCarreer')}
              />
            )}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Nombre&nbsp;
                <Tooltip title="El nombre con el que se conoce a la carrera">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor ingresa un nombre', whitespace: true }]
            })(<Input name="name" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Objetivo&nbsp;
                <Tooltip title="Objetivo de la carrera">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('objetivo', {
              rules: [{ required: true, message: 'Por favor ingresa el objetivo de la carrera', whitespace: true }]
            })(<Input name="objetivo" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Perfil del egresado&nbsp;
                <Tooltip title="Describe el perfil de un egresado de esta carrera">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('perfil', {
              rules: [
                {
                  required: true,
                  message: 'Por favor describe el perfil del egresado',
                  whitespace: true
                }
              ]
            })(<Input name="perfil" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Área laboral&nbsp;
                <Tooltip title="Describe donde puede desempeñarse el egresado de la carrera ">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('areaLaboral', {
              rules: [
                {
                  required: true,
                  message: 'Por favor describe donde puede desempeñarse el egresado',
                  whitespace: true
                }
              ]
            })(<Input name="areaLaboral" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Duración de la carrera&nbsp;
                <Tooltip title="De cuantos semestres, cuatrimestres o tiempo que dura la carrera">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('duration', {
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresa el tiempo requerido para culminar la carrera',
                  whitespace: true
                }
              ]
            })(<Input name="duration" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Alumnos Matriculados actualmente&nbsp;
                <Tooltip title="Cuantos alumnos cursan actualmente la carrera">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('matricula', {
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresa solo numeros',
                  whitespace: true
                }
              ]
            })(<Input name="matricula" type="number" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button2">
              Register
            </Button>
          </Form.Item>
        </Form>
      </LayoutP>
    )
  }
}
const WrappedFormCarreer = Form.create({ name: 'addCarreer' })(CarreerForm)
export default WrappedFormCarreer
