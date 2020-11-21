import React, { useState } from 'react';
import { environment } from '../config/environment';
import { Link } from 'react-router-dom';

export const Publicar = () => {
  const [form, setForm] = useState({
    categorys: [],
    tags: []
  });
  const [errors, setErrors] = useState([]);
  const [res, setRes] = useState(false);

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleInputArrayEnter = (event) => {
    if (event.charCode === 13 && event.target.value !== '') {
      let word = event.target.value;
      word = word.toLocaleLowerCase();
      for (const validate of form[event.target.name]) {
        if (validate === word) {
          event.target.value = '';
          event.preventDefault();
          return;
        }
      }
      form[event.target.name].push(word);
      event.target.value = '';
      setForm({ ...form });
      event.preventDefault();
    } else if (event.charCode === 13) {
      event.preventDefault();
    }
  };

  const handleInputArrayChange = (event) => {
    if (event.target.value !== '') {
      let word = event.target.value;
      word = word.toLocaleLowerCase();
      for (const validate of form[event.target.name]) {
        if (validate === word) {
          event.target.value = '';
          event.preventDefault();
          return;
        }
      }
      form[event.target.name].push(word);
      event.target.value = '';
      setForm({ ...form });
    }
  };

  const deleteElement = async (array, index) => {
    if (array === 'tags') {
      form.tags.splice(index, 1);
      setForm({ ...form });
    } else if (array === 'categoria') {
      form.categorys.splice(index, 1);
      setForm({ ...form });
    }
  };

  const sendPost = async (event) => {
    event.preventDefault();
    const data = {
      title: form.title,
      url: form.url,
      content: form.content
    };
    if (form.categorys.length > 0) {
      data.categorys = form.categorys;
    }
    if (form.tags.length > 0) {
      data.tags = form.tags;
    }
    const response = await fetch(environment.API_URL + '/publish', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
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
    setRes(true);
    await delay(3500);
    window.location = '/';
  };
  const Success = () => {
    if (res) {
      return (
        <div className='card border-success mx-auto m-2'>
          <div className='card-body text-success text-center'>
            <p className='card-text'> Publicación realizada correctamente</p>
            <p className='card-text'> Redirigiendo al inicio</p>
          </div>
        </div>
      );
    }
    return <></>;
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <div className='card m-4'>
      <div className='jumbotron bg-white'>
        <strong>
          <h5 className='text-center display-4'>Realiza una publicación</h5>
        </strong>
        <hr className='my-4' />

        <Success></Success>

        {errors.map((error, index) => (
          <div className='card border-danger mx-auto m-2' key={index}>
            <div className='card-body text-danger'>
              <p className='card-text'>Error: {error}</p>
            </div>
          </div>
        ))}

        <form onSubmit={sendPost}>
          <div className='form-group'>
            <h4>
              <label htmlFor='title'>Título</label>
            </h4>
            <input
              id='title'
              type='text'
              className='form-control'
              placeholder='Ingrese un título para la publicación'
              name='title'
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <h5>
              <label htmlFor='url'>URL</label>
            </h5>
            <input
              id='url'
              type='url'
              className='form-control'
              placeholder='Ingrese la url de la herramienta que desea compartir'
              name='url'
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <h5>
              <label htmlFor='content'>Contenido</label>
            </h5>
            <textarea
              id='content'
              type='text'
              className='form-control'
              placeholder='Ingrese una descripción, experiencias o posibles usos del contenido a compartir'
              name='content'
              rows='8'
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <h5>
              <label htmlFor='categorys'>
                Categorías{' '}
                <small className='text-muted'>(Selección multiple)</small>
              </label>
            </h5>
            <select
              className='selectpicker form-control'
              name='categorys'
              multiple='multiple'
              onChange={handleInputArrayChange}
            >
              <option value='ingeniería'>Ingeniería</option>
              <option value='software'>Software</option>
              <option value='arquitectura'>Arquitectura</option>
              <option value='ciencia'>Ciencia</option>
            </select>
            <small className='text-muted'>
              {form.categorys.map((categoria, index) => (
                <button
                  className='badge badge-secondary d-inline mr-1'
                  name='categorys'
                  onClick={() => deleteElement('categoria', index)}
                  type='button'
                  key={index}
                >
                  {categoria}
                </button>
              ))}
            </small>
          </div>

          <div className='form-group'>
            <h5>
              <label htmlFor='tags'>
                Tags{' '}
                <small className='text-muted'>
                  (Ingrese las palabras una a una)
                </small>
              </label>
            </h5>
            <input
              id='tags'
              type='text'
              className='form-control'
              placeholder='Ingrese palabras claves del contenido, esto sirve para que los demás usuarios puedan filtrar mejor!'
              name='tags'
              onBlur={handleInputArrayChange}
              onKeyPress={handleInputArrayEnter}
            />
            <small className='text-muted'>
              {form.tags.map((tag, index) => (
                <button
                  className='badge badge-secondary d-inline mr-1'
                  name='tags'
                  onClick={() => deleteElement('tags', index)}
                  type='button'
                  key={index}
                >
                  {tag}
                </button>
              ))}
            </small>
          </div>
          <button
            type='submit'
            className='btn btn-primary mt-3'
            disabled={
              form.categorys < 1 ||
              form.tags < 1 ||
              !form.content ||
              !form.url ||
              !form.title
            }
          >
            Publicar
          </button>
          <Link className='btn btn-primary mt-3 ml-3' to='/'>
            Volver al inicio
          </Link>
        </form>
        <Success></Success>
      </div>
    </div>
  );
};
