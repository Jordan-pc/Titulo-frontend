import React from 'react';
import './App.css';
import { NavBar } from './components/navbar';
import { PostProvider } from './context/postContext';
import { Home } from './pages/home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
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
