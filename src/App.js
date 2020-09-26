import React from 'react';
import './App.css';
import { NavBar } from './components/navbar';
import { Card } from './components/card';
import { Filter } from './components/filter';

function App() {
  return (
    <div className='App'>
      <NavBar></NavBar>
      <Filter></Filter>
      <Card></Card>
    </div>
  );
}

export default App;
