import React, { useState } from 'react';

export const Publicar = () => {
  const [form, setForm] = useState({
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
      form[event.target.name].push(event.target.value);
      event.target.value = '';
      setForm({ ...form });
    }
  };

  const handleInputArrayChange = (event) => {
    if (event.target.value !== '') {
      form[event.target.name].push(event.target.value);
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
    const response = await fetch('http://localhost:3000/publish', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify(data)
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
    window.location = '/';
  };

  return (
    <div className='container mt-5'>
      <div className='jumbotron bg-white'>
        <h5 className='text-center display-4'>Realiza una publicación</h5>
        <hr className='my-4' />

        {errors.map((error, index) => (
          <p className='text-danger text-break text-justify' key={index}>
            Error: {error}
          </p>
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
              <label htmlFor='categorys'>Categorias</label>
            </h5>
            <input
              id='categorys'
              type='text'
              className='form-control'
              placeholder='Ingrese las categorias a las cuales pertenece este contenido'
              name='categorys'
              onBlur={handleInputArrayChange}
              onKeyPress={handleInputArrayEnter}
            />
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
          <button type='submit' className='btn btn-primary mt-3'>
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};
