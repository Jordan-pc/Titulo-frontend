import React, { useState } from 'react';
import { environment } from '../config/environment';
import { Link } from 'react-router-dom';

export const ForgotPassoword = () => {
  const [email, setEmail] = useState({ email: '' });
  const [errors, setErrors] = useState([]);
  const [res, setRes] = useState(false);

  const handleInputChange = (event) => {
    setEmail({
      ...email,
      [event.target.name]: event.target.value
    });
  };

  const sendRegister = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexp.test(email.email)) {
      setErrors(['Ingrese un correo valido']);
      return;
    }
    const response = await fetch(environment.API_URL + '/user/forgot', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email)
    });
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
    window.scrollTo(0, 0);
  };

  const Success = () => {
    if (res) {
      return (
        <div className='card border-success mx-auto m-2'>
          <div className='card-body text-success'>
            <p className='card-text'>
              Se ha enviado un mail para reestablecer la contraseña, una vez
              restablecida puedes ingresar a la plataforma{' '}
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
      style={{ maxWidth: '500px' }}
    >
      {errors.map((error, index) => (
        <div className='card border-danger mx-auto m-2' key={index}>
          <div className='card-body text-danger'>
            <p className='card-text'>Error: {error}</p>
          </div>
        </div>
      ))}

      <Success></Success>

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

      <button
        type='submit'
        className='btn btn-primary btn-block'
        disabled={!email.email}
      >
        Enviar
      </button>
    </form>
  );
};
