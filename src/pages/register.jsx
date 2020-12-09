import React, { useState, useEffect } from 'react';
import { environment } from '../config/environment';
import { Link } from 'react-router-dom';
import * as crypto from 'asymmetric-crypto';

export const Register = () => {
  const [register, setRegister] = useState({});
  const [res, setRes] = useState(false);
  const [errors, setErrors] = useState([]);
  const [key, setKey] = useState({});

  const myKeyPair = crypto.keyPair();

  const handleInputChange = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value
    });
  };

  const sendRegister = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexp.test(register.email)) {
      setErrors(['Ingrese un correo valido']);
      return;
    }
    const encrypted = crypto.encrypt(
      JSON.stringify(register),
      key,
      myKeyPair.secretKey
    );
    const response = await fetch(environment.API_URL + '/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ encrypted, publicKey: myKeyPair.publicKey })
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
            <p className='card-text'>Usuario registrado correctamente</p>
            <p className='card-text'>
              Se ha enviado un mail al correo indicado para que verifiques tu
              cuenta, una vez hecho esto, podras ingresar a la plataforma. Una
              vez verificada tu cuenta, ingresa a la plataforma{' '}
              <Link to='/login'>aquí</Link>
            </p>
          </div>
        </div>
      );
    }
    return <></>;
  };

  useEffect(() => {
    const getPublic = async () => {
      const response = await fetch(environment.API_URL + '/key');
      const data = await response.json();
      setKey(data.key);
    };
    getPublic();
  }, []);

  return (
    <form
      className='card w-75 mt-5 mb-5 ml-5 mr-5 p-5 mx-auto'
      onSubmit={sendRegister}
      style={{ maxWidth: '500px' }}
    >
      <h3 className='text-center'>Regístrate</h3>

      <Success></Success>

      {errors.map((error, index) => (
        <div className='card border-danger mx-auto m-2' key={index}>
          <div className='card-body text-danger'>
            <p className='card-text'>Error: {error}</p>
          </div>
        </div>
      ))}

      <div className='form-group'>
        <label>Nombre</label>
        <input
          type='text'
          className='form-control'
          placeholder='Ingresa tu nombre y apellido'
          name='name'
          onChange={handleInputChange}
        />
      </div>

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
        <label>Confirmar contraseña</label>
        <input
          type='password'
          className='form-control'
          placeholder='Ingrese la contraseña nuevamente'
          name='confirm'
          onChange={handleInputChange}
        />
      </div>

      <button
        type='submit'
        className='btn btn-primary btn-block'
        disabled={
          !register.name ||
          !register.email ||
          !register.password ||
          register.password.length <= 4 ||
          !register.confirm ||
          register.confirm !== register.password
        }
      >
        Enviar
      </button>
    </form>
  );
};
