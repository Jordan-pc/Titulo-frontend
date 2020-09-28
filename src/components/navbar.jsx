import React from 'react';
import logoutem from '../assets/Logoutem-1.png';

export const NavBar = () => {
  return (
    <nav
      className='navbar navbar-expand navbar-light flex-column flex-md-row bd-navbar'
      style={{ backgroundColor: 'white' }}
    >
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
          className='nav-link btn btn-outline-info action-button'
          style={{ color: 'black' }}
          href='/'
        >
          Inicio de sección
        </a>
        <a
          className='nav-link btn btn-outline-info action-button'
          style={{ color: 'black', marginLeft: '5px' }}
          href='/'
        >
          Registrarse
        </a>
      </div>
    </nav>
  );
};
