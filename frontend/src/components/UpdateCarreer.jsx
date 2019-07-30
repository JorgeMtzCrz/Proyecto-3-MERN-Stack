import React from 'react'
import { Form, Input, Tooltip, Icon, Button, Cascader } from 'antd'
import LayoutP from './LayoutP'
import axios from 'axios'

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

class CarreerUpdateForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  }

  componentDidMount() {
    axios
      .get(`https://aun-no-se.herokuapp.com/carreero/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            ...data.carreer
          }
        })
        console.log(this.state)
      })
      .catch(err => {
        console.log(err)
      })
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
        axios
          .patch(`https://aun-no-se.herokuapp.com/carreer/${this.props.match.params.id}`, this.state)
          .then(({ data }) => {
            this.setState(prevState => {
              return {
                ...prevState,
                ...data.carreer
              }
            })
            this.props.history.push(this.props.history.goBack())
          })
          .catch(err => {
            console.log(err)
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
    if (!this.state) return <p>Loading</p>
    return (
      <LayoutP>
        <div className="signU">
          <pre>{JSON.stringify(this.state)}</pre>
          <h2>Actualizar información de Carrera</h2>
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
              rules: [{ required: true, message: 'Por favor ingresa un nombre', whitespace: true }],
              initialValue: `${this.state.name}`
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
              rules: [{ required: true, message: 'Por favor ingresa el objetivo de la carrera', whitespace: true }],
              initialValue: `${this.state.objetivo}`
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
              ],
              initialValue: `${this.state.perfil}`
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
              ],
              initialValue: `${this.state.areaLaboral}`
            })(<Input name="perfil" onChange={this.handleInput} />)}
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
              ],
              initialValue: `${this.state.duration}`
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
              ],
              initialValue: `${this.state.matricula}`
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
const WrappedFormUpdateCarreer = Form.create({ name: 'updateCarreer' })(CarreerUpdateForm)
export default WrappedFormUpdateCarreer
