import React from 'react';

export const Login = () => {
  return (
    <form
      className='card w-75 mt-5 mb-5 ml-5 mr-5 p-5 mx-auto'
      style={{ maxWidth: '500px' }}
    >
      <h3 className='text-center'>Iniciar Sesión</h3>

      <div className='form-group'>
        <label>Correo</label>
        <input
          type='email'
          className='form-control'
          placeholder='Ingrese su correo'
        />
      </div>

      <div className='form-group'>
        <label>Contraseña</label>
        <input
          type='password'
          className='form-control'
          placeholder='Ingrese la contraseña'
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
