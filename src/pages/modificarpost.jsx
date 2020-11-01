import React, { useState, useEffect } from 'react';
import { environment } from '../config/environment';

export const ModificarPost = (props) => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    url: '',
    categorys: [],
    tags: []
  });
  const [errors, setErrors] = useState([]);

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
    const response = await fetch(
      environment.API_URL + '/publications/' + props.match.params.id,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        },
        body: JSON.stringify(data)
      }
    );
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
    window.location = '/';
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        environment.API_URL + '/publications/' + props.match.params.id
      );
      const post = await response.json();
      if (post.message) {
        window.location = '/';
        return;
      }
      setForm(post);
    };
    getPost();
  }, [props.match.params.id]);

  return (
    <div className='card m-4'>
      <div className='jumbotron bg-white'>
        <h5 className='text-center display-4'>Editar publicación</h5>
        <hr className='my-4' />

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
              value={form.title}
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
              value={form.url}
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
              value={form.content}
              name='content'
              rows='8'
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <h5>
              <label htmlFor='categorys'>Categorias</label>
            </h5>
            <select
              className='selectpicker form-control'
              name='categorys'
              multiple='multiple'
              onChange={handleInputArrayChange}
            >
              <option disabled>Selección multiple</option>
              <option value='ingeniería'>Ingeniería</option>
              <option value='software'>Software</option>
              <option value='arquitectura'>Arquitectura</option>
              <option value='ciencia'>Ciencia</option>
            </select>
            <small className='text-muted'>
              {form.categorys.map((categoria, index) => (
                <button
                  className='badge badge-secondary d-inline mr-1'
                  name='tags'
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
              <label htmlFor='tags'>Tags</label>
            </h5>
            <input
              id='tags'
              type='text'
              className='form-control'
              placeholder='Los tags mostrados debajo son los que posee actualmente, haga click en una para borrarla, o ingrese nuevas aca'
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
          <button type='submit' className='btn btn-primary mt-3'>
            Modificar
          </button>
          <button
            className='btn btn-primary mt-3 ml-3'
            onClick={() => {
              window.location = '/';
            }}
          >
            Volver al inicio
          </button>
        </form>
      </div>
    </div>
  );
};
