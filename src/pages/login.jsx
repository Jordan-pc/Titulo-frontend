import React, { useState } from 'react';

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
    const response = await fetch('http://localhost:3000/auth/login', {
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
      localStorage.setItem('token', status.accessToken);
      localStorage.setItem('role', status.role);
      localStorage.setItem('id', status.id);
      localStorage.setItem('name', status.name);
    }
    // console.log(localStorage.getItem('token'));
    // console.log('redirect');
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
        <p className='text-danger text-break text-justify' key={index}>
          Error: {error}
        </p>
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

      <div className='form-group'>
        <div className='custom-control custom-checkbox'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='customCheck1'
          />
          <label className='custom-control-label' htmlFor='customCheck1'>
            Remember me
          </label>
        </div>
      </div>

      <button type='submit' className='btn btn-primary btn-block'>
        Submit
      </button>
      <p className='forgot-password text-right'>
        Forgot <a href='/'>password?</a>
      </p>
    </form>
  );
};
