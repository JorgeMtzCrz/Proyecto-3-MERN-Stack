import axios from 'axios'
const baseURL = 'https://aun-no-se.herokuapp.com'

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    })
  }
  signup(data) {
    return this.service.post('/signup', data)
  }
  login(data) {
    return this.service.post('/login', data)
  }
  logout() {
    return this.service.get('/logout')
  }
  addCarreer(data) {
    return this.service.post('/carreer', data)
  }
  updateCarreer(data) {
    return this.service.patch('/carreer/:id', data)
  }
}

export default AuthService
