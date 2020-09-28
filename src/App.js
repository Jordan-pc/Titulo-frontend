import React from 'react';
import './App.css';
import { NavBar } from './components/navbar';
import { Card } from './components/card';
import { Filter } from './components/filter';
import { PostProvider } from './context/postContext';

function App() {
  return (
    <div className='App'>
      <PostProvider>
        <NavBar></NavBar>
        <Filter></Filter>
        <Card></Card>
      </PostProvider>
    </div>
  );
}

export default App;
