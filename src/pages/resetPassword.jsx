import React, { useState } from 'react';
import { environment } from '../config/environment';
import { Link } from 'react-router-dom';

export const ResetPassword = (props) => {
  const [register, setRegister] = useState({
    password: '',
    passwordConfirmation: ''
  });
  const [errors, setErrors] = useState([]);
  const [res, setRes] = useState(false);

  const handleInputChange = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value
    });
  };

  const sendRegister = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const response = await fetch(
      environment.API_URL + '/user/password/' + props.match.params.id,
      {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(register)
      }
    );
    const status = await response.json();
    if (response.status !== 200) {
      if (status.message) {
        setErrors([status.message]);
        setRes(false);
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
        setRes(false);
        return;
      }
    }
    setErrors([]);
    setRes(true);
  };

  const Success = () => {
    if (res) {
      return (
        <div className='card border-success mx-auto m-2'>
          <div className='card-body text-success'>
            <p className='card-text'>
              Se ha modificado su contraseña, puedes ingresar a la plataforma{' '}
              <Link to='/login'>aquí</Link>
            </p>
          </div>
        </div>
      );
    }
    return <></>;
  };

  return (
    <form
      className='card w-75 mt-5 mb-5 ml-5 mr-5 p-5 mx-auto'
      onSubmit={sendRegister}
    >
      <h3 className='mb-4'>Restablecer contraseña</h3>
      {errors.map((error, index) => (
        <div className='card border-danger mx-auto m-2' key={index}>
          <div className='card-body text-danger'>
            <p className='card-text'>Error: {error}</p>
          </div>
        </div>
      ))}

      <Success></Success>

      <div className='form-group row d-flex justify-content-center'>
        <label htmlFor='password' className='col-sm-3 col-form-label'>
          Nueva contraseña:
        </label>
        <div className='col-sm-7'>
          <input
            type='password'
            className='form-control'
            placeholder='Ingrese la contraseña'
            name='password'
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='form-group row d-flex justify-content-center'>
        <label
          htmlFor='passwordConfirmation'
          className='col-sm-3 col-form-label'
        >
          Confirmar contraseña:
        </label>
        <div className='col-sm-7'>
          <input
            type='password'
            className='form-control'
            placeholder='Ingrese nuevamente la contraseña'
            name='passwordConfirmation'
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button
        type='submit'
        className='btn btn-primary btn-block'
        disabled={
          !register.password ||
          !register.passwordConfirmation ||
          register.passwordConfirmation !== register.password
        }
      >
        Enviar
      </button>
    </form>
  );
};
