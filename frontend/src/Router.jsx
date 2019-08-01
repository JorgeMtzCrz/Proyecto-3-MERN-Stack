import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeContainer from './components/HomeContainer'
import WrappedRegistrationForm from './components/SignUser'
import WrappedNormalLoginForm from './components/LoginUser'
import Perfil from './components/PerfilUser'
import PerfilUniversity from './components/PerfilUniversity'
import Universities from './components/Universities'
import WrappedFormCarreer from './components/AddCarreer'
import WrappedFormUpdateUniversity from './components/UpdateU'
import WrappedFormUpdateCarreer from './components/UpdateCarreer'
import UniversidadDetail from './components/UniversidadDetail'
import CareerDetail from './components/CareerDetail'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route component={HomeContainer} exact path="/" />
      <Route component={WrappedRegistrationForm} exact path="/signup" />
      <Route component={WrappedNormalLoginForm} exact path="/login" />
      <Route component={Perfil} exact path="/profile/:id" />
      <Route component={PerfilUniversity} exact path="/profile/university/:id" />
      <Route component={Universities} exact path="/universidades" />
      <Route component={WrappedFormCarreer} exact path="/profile/university/:id/addcarreer" />
      <Route component={WrappedFormUpdateCarreer} exact path="/updateC/:id" />
      <Route component={WrappedFormUpdateUniversity} exact path="/updateU/:id" />
      <Route component={UniversidadDetail} exact path="/universidad/:id" />
      <Route component={CareerDetail} exact path="/career/:id" />
    </Switch>
  </BrowserRouter>
)

export default Router
