import React from 'react';
import './App.css';
import { NavBar } from './components/navbar';
import { PostProvider } from './context/postContext';
import { Home } from './pages/home';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Post } from './pages/post';
import { Publicar } from './pages/publicar';
import { ModificarPost } from './pages/modificarpost';
import { MisPublicaciones } from './pages/mispublicaciones';
import { Reportar } from './pages/reportar';
import { Reports } from './pages/reports';
import { Perfil } from './pages/perfil';
import { VerifyAccount } from './pages/verifyAccount';
import { ForgotPassoword } from './pages/forgotPassword';
import { ResetPassword } from './pages/resetPassword';
import { Stadistics } from './pages/stadistics';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Register} />
        <Route path='/mispublicaciones' exact component={MisPublicaciones} />
        <Route path='/perfil' exact component={Perfil} />
        <Route path='/reportes' exact component={Reports} />
        <Route path='/stadistics' exact component={Stadistics} />
        <Route path='/reportar/:id' component={Reportar} />
        <Route path='/publications/modify/:id' component={ModificarPost} />
        <Route path='/publications/:id' component={Post} />
        <Route path='/publicar' component={Publicar} />
        <Route path='/validate/email/:id' component={VerifyAccount} />
        <Route path='/reset/password/:id' component={ResetPassword} />
        <Route path='/forgot/password' component={ForgotPassoword} />
        <PostProvider>
          <Route path='/' exact>
            <Home />
          </Route>
        </PostProvider>
      </Switch>
    </Router>
  );
}

export default App;
