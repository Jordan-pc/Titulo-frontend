import React from 'react';
import logoutem from '../assets/Logoutem-1.png';

export const NavBar = () => {
  const cerrarSesion = () => {
    sessionStorage.clear();
    return;
  };

  const UserRole = (props) => {
    const role = sessionStorage.getItem('role');
    if (role === 'ADMIN') {
      return (
        <>
          <li className='nav-item'>
            <a className='nav-link' href='/reportes'>
              Reportes
            </a>
          </li>
        </>
      );
    }
    return <></>;
  };

  const Logged = (props) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      return (
        <>
          <div className='navbar-nav-scroll'>
            <ul className='navbar-nav bd-navbar-nav flex-row'>
              <li className='nav-item'>
                <a className='nav-link' href='/'>
                  Inicio
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/publicar'>
                  Hacer una publicación
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/mispublicaciones'>
                  Mis publicaciones
                </a>
              </li>
              <UserRole></UserRole>
            </ul>
          </div>
          <div className='navbar-nav ml-md-auto'>
            <a
              className='nav-link btn btn-outline-info action-button text-dark ml-2'
              href='/perfil'
            >
              Hola {sessionStorage.getItem('name')}
            </a>
            <a
              className='nav-link btn btn-outline-info action-button text-dark ml-2'
              href='/'
              onClick={cerrarSesion}
            >
              Cerrar Sesión
            </a>
          </div>
        </>
      );
    }
    return (
      <>
        <div className='navbar-nav-scroll'>
          <ul className='navbar-nav bd-navbar-nav flex-row'>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                Inicio
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
      </>
    );
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
      <Logged></Logged>
    </nav>
  );
};
