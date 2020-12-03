import React, { useState, useEffect } from 'react';
import { environment } from '../config/environment';
import { Link } from 'react-router-dom';
import * as crypto from 'asymmetric-crypto';

export const Perfil = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [res, setRes] = useState(false);
  const [errors, setErrors] = useState([]);
  const [key, setKey] = useState({});

  const myKeyPair = crypto.keyPair();

  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    });
  };

  const Success = () => {
    if (res) {
      return (
        <div className='card border-success mx-auto m-2'>
          <div className='card-body text-success'>
            <p className='card-text'>Cambios realizados correctamente</p>
          </div>
        </div>
      );
    }
    return <></>;
  };

  const modifyProfile = async (event) => {
    event.preventDefault();
    let data = {};
    if (profile.name) data.name = profile.name;
    if (profile.email) data.email = profile.email;
    if (profile.password === profile.passwordConfirmation) {
      if (profile.password !== '' && profile.passwordConfirmation !== '') {
        data.password = profile.password;
        data.passwordConfirmation = profile.passwordConfirmation;
      }
    } else {
      setRes(false);
      setErrors(['Las nuevas contraseñas no coinciden']);
      return;
    }
    if (profile.old) {
      data.old = profile.old;
      const encrypted = crypto.encrypt(
        JSON.stringify(data),
        key,
        myKeyPair.secretKey
      );
      const response = await fetch(environment.API_URL + '/profile/change', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        },
        body: JSON.stringify({ encrypted, publicKey: myKeyPair.publicKey })
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
      } else {
        sessionStorage.removeItem('name');
        sessionStorage.setItem('name', data.name);
        setErrors([]);
        setRes(true);
      }
    } else {
      setRes(false);
      setErrors(['Ingrese la contraseña actual para confirmar los cambios']);
      return;
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(environment.API_URL + '/profile', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        }
      });
      const json = await response.json();
      if (json.message) {
        window.location = '/';
        return;
      }
      setProfile({
        name: json.name,
        email: json.email,
        password: '',
        passwordConfirmation: ''
      });
    };
    const getPublic = async () => {
      const response = await fetch(environment.API_URL + '/key');
      const data = await response.json();
      setKey(data.key);
    };
    getPublic();
    getProfile();
  }, []);

  return (
    <div className='bg-white card mx-auto m-3 p-3 w-75 '>
      <h5 className='text-center display-4'>Perfil</h5>
      <Success></Success>
      <hr className='my-4' />

      {errors.map((error, index) => (
        <div className='card border-danger mx-auto m-2' key={index}>
          <div className='card-body text-danger'>
            <p className='card-text'>Error: {error}</p>
          </div>
        </div>
      ))}

      <form onSubmit={modifyProfile}>
        <div className='form-group row d-flex justify-content-center'>
          <label htmlFor='name' className='col-sm-3 col-form-label'>
            Nombre de usuario:
          </label>
          <div className='col-sm-7'>
            <input
              type='text'
              className='form-control'
              id='name'
              value={profile.name}
              name='name'
              onChange={handleInputChange}
            ></input>
          </div>
        </div>

        <div className='form-group row d-flex justify-content-center'>
          <label htmlFor='email' className='col-sm-3 col-form-label'>
            Email:
          </label>
          <div className='col-sm-7'>
            <input
              type='email'
              className='form-control'
              id='email'
              value={profile.email}
              name='email'
              onChange={handleInputChange}
            ></input>
          </div>
        </div>

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

        <div className='form-group row d-flex justify-content-center'>
          <label htmlFor='old' className='col-sm-3 col-form-label'>
            Contraseña actual:
          </label>
          <div className='col-sm-7'>
            <input
              type='password'
              className='form-control'
              placeholder='Ingrese su contraseña actual'
              name='old'
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='d-flex justify-content-center'>
          <button className='btn btn-primary m-4' type='submit'>
            Modificar Datos
          </button>
          <Link className='btn btn-primary m-4' to='/'>
            Volver al inicio
          </Link>
        </div>
      </form>
    </div>
  );
};
