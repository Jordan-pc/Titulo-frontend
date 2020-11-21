import React, { useState } from 'react';
import { environment } from '../config/environment';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [register, setRegister] = useState({});
  const [errors, setErrors] = useState([]);

  const handleInputChange = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value
    });
  };

  const sendLogin = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(register.email)) {
      setErrors(['Ingrese un correo valido']);
      return;
    }
    const response = await fetch(environment.API_URL + '/auth/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(register)
    });
    const status = await response.json();
    if (response.status !== 200) {
      if (status.message) {
        setErrors([status.message]);
        return;
      } else if (status.errors) {
        const err = [];
        status.errors.map((e) => {
          const error = e.msg;
          const param = e.param;
          err.push(`-${error} en el campo ${param} `);
          return err;
        });
        setErrors([err]);
        return;
      }
    }
    if (status.accessToken) {
      sessionStorage.setItem('token', status.accessToken);
      sessionStorage.setItem('role', status.role);
      sessionStorage.setItem('id', status.id);
      sessionStorage.setItem('name', status.name);
    }
    window.location = '/';
  };

  return (
    <form
      className='card w-75 mt-5 mb-5 ml-5 mr-5 p-5 mx-auto'
      onSubmit={sendLogin}
      style={{ maxWidth: '500px' }}
    >
      <h3 className='text-center'>Iniciar Sesión</h3>

      {errors.map((error, index) => (
        <div className='card border-danger mx-auto m-2' key={index}>
          <div className='card-body text-danger'>
            <p className='card-text'>Error: {error}</p>
          </div>
        </div>
      ))}

      <div className='form-group'>
        <label>Correo</label>
        <input
          type='email'
          className='form-control'
          placeholder='Ingrese su correo'
          name='email'
          onChange={handleInputChange}
        />
      </div>

      <div className='form-group'>
        <label>Contraseña</label>
        <input
          type='password'
          className='form-control'
          placeholder='Ingrese la contraseña'
          name='password'
          onChange={handleInputChange}
        />
      </div>

      <button
        type='submit'
        className='btn btn-primary btn-block mt-3'
        disabled={!register.email || !register.password}
      >
        Ingresar
      </button>
      <small className='forgot-password text-right'>
        <Link to='/forgot/password'>Olvidaste tu contraseña?</Link>
      </small>
      <small className='mt-3 text-center'>
        Si no estas registrado, <Link to='/signup'>ingresa aquí</Link>
      </small>
    </form>
  );
};
