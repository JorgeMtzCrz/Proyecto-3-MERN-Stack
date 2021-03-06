import React from 'react'
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import LayoutP from './LayoutP'
import axios from 'axios'

class UniversityUpdateForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    userId: ''
  }

  componentDidMount() {
    axios
      .get(`https://diegoye.herokuapp.com/detailU/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            ...data.university
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
          .patch(`https://diegoye.herokuapp.com/university/${this.props.match.params.id}`, this.state)
          .then(({ data }) => {
            this.setState(prevState => {
              return {
                ...prevState,
                ...data.university
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
    if (!this.state && !this.state.userId) return <p>Loading</p>
    return (
      <LayoutP>
        <div className="signU">
          
          <h2>Actualizar información de la Institución</h2>
        </div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <span>
                Teléfono&nbsp;
                <Tooltip title="Telefóno de la institución">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('telephone', {
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresa el número telefónico de la institución',
                  whitespace: true
                }
              ],
              initialValue: `${this.state.telephone}`
            })(<Input name="telephone" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Tipo&nbsp;
                <Tooltip title="Escribe si tu institución es Pública o Privada">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('typeSocial', {
              rules: [
                {
                  required: true,
                  message: 'Por favor escribe el tipo de institución',
                  whitespace: true
                }
              ],
              initialValue: `${this.state.typeSocial}`
            })(<Input name="typeSocial" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Dirección&nbsp;
                <Tooltip title="Escribe la dirección de tu escuela">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresa la dirección de la escuela',
                  whitespace: true
                }
              ],
              initialValue: `${this.state.address}`
            })(<Input name="address" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Misión&nbsp;
                <Tooltip title="Escribe la misión de tu escuela">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('mision', {
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresa la misión de la escuela',
                  whitespace: true
                }
              ],
              initialValue: `${this.state.mision}`
            })(<Input name="mision" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Visión&nbsp;
                <Tooltip title="Escribe la visión de tu escuela">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('vision', {
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresa la visión de la escuela',
                  whitespace: true
                }
              ],
              initialValue: `${this.state.vision}`
            })(<Input name="vision" onChange={this.handleInput} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Objetivo&nbsp;
                <Tooltip title="Escribe el objetivo de tu escuela">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('objetivo', {
              rules: [
                {
                  required: true,
                  message: 'Por favor ingresa el objetivo de la escuela',
                  whitespace: true
                }
              ],
              initialValue: `${this.state.objetivo}`
            })(<Input name="objetivo" onChange={this.handleInput} />)}
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
const WrappedFormUpdateUniversity = Form.create({ name: 'updateUniversity' })(UniversityUpdateForm)
export default WrappedFormUpdateUniversity
