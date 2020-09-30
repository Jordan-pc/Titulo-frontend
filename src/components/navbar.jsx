import React from 'react';
import logoutem from '../assets/Logoutem-1.png';

export const NavBar = () => {
  const freetoken = () => {
    localStorage.removeItem('token');
    return;
  };

  const Logged = (props) => {
    const token = localStorage.getItem('token');
    if (token) {
      return (
        <li className='nav-item'>
          <a className='nav-link' href='/' onClick={freetoken}>
            borrar token
          </a>
        </li>
      );
    }
    return <></>;
  };

  return (
    <nav className='navbar navbar-expand navbar-light flex-column flex-md-row bd-navbar bg-light'>
      <a className='navbar-brand' href='/'>
        <img
          src={logoutem}
          alt='LogoUtem'
          style={{ width: '30px', height: '40px', marginRight: ' 5px' }}
        ></img>
        Recursos UTEM
      </a>
      <div className='navbar-nav-scroll'>
        <ul className='navbar-nav bd-navbar-nav flex-row'>
          <Logged></Logged>
          <li className='nav-item'>
            <a className='nav-link' href='/'>
              Inicio
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/algo'>
              Segunda
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/otracosa'>
              Tercera
            </a>
          </li>
        </ul>
      </div>
      <div className='navbar-nav ml-md-auto'>
        <a
          className='nav-link btn btn-outline-info action-button text-dark'
          href='/login'
        >
          Inicio de sección
        </a>
        <a
          className='nav-link btn btn-outline-info action-button text-dark ml-2'
          href='/signup'
        >
          Registrarse
        </a>
      </div>
    </nav>
  );
};
