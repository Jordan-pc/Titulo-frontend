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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MisPublicaciones } from './pages/mispublicaciones';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Register} />
        <Route path='/mispublicaciones' exact component={MisPublicaciones} />
        <Route path='/publications/modify/:id' component={ModificarPost} />
        <Route path='/publications/:id' component={Post} />
        <Route path='/publicar' component={Publicar} />
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
