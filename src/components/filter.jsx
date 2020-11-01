import React, { useState, useContext } from 'react';
import { PostContext } from '../context/postContext';

export const Filter = () => {
  const [filtro, setFiltro] = useState({
    categorys: [],
    tags: []
  });

  const { setPosts, setFiltered } = useContext(PostContext);

  const handleInputChange = (event) => {
    setFiltro({
      ...filtro,
      [event.target.name]: event.target.value
    });
  };

  const handleInputArrayChange = (event) => {
    if (event.target.value !== '') {
      filtro[event.target.name].push(event.target.value);
    }
    event.target.value = '';
    setFiltro({ ...filtro });
  };

  const handleInputArrayEnter = (event) => {
    if (event.charCode === 13 && event.target.value !== '') {
      for (const validate of filtro[event.target.name]) {
        if (validate === event.target.value) {
          event.target.value = '';
          event.preventDefault();
          return;
        }
      }
      filtro[event.target.name].push(event.target.value);
      event.target.value = '';
      setFiltro({ ...filtro });
      event.preventDefault();
    } else if (event.charCode === 13) {
      event.preventDefault();
    }
  };

  const sendFilter = (event) => {
    event.preventDefault();
    const sendData = {};
    if (filtro.title) {
      sendData.title = filtro.title;
    }
    if (filtro.categorys.length > 0) {
      sendData.categorys = filtro.categorys;
    }
    if (filtro.tags.length > 0) {
      sendData.tags = filtro.tags;
    }
    getPosts(sendData);
    setFiltered(true);
  };

  const getPosts = async (data) => {
    const response = await fetch('http://localhost:3000/publications/filter', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const publications = await response.json();
    setPosts(publications);
  };

  const deleteElement = async (array, index) => {
    if (array === 'tags') {
      filtro.tags.splice(index, 1);
      setFiltro({ ...filtro });
    } else if (array === 'categoria') {
      filtro.categorys.splice(index, 1);
      setFiltro({ ...filtro });
    }
  };

  return (
    <>
      <div className='mt-3 mr-3 ml-3 mb-3'>
        <div className='card p-2'>
          <form onSubmit={sendFilter}>
            <div className='from-group'>
              <label htmlFor='search'>
                <h5>Filtros</h5>
              </label>
              <input
                id='search'
                className='form-control'
                type='text'
                placeholder='Buscar por titulo'
                name='title'
                onChange={handleInputChange}
              ></input>
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='area'>Categorias</label>
              <input
                id='area'
                className='form-control'
                type='text'
                placeholder='Buscar por categorias'
                name='categorys'
                onBlur={handleInputArrayChange}
                onKeyPress={handleInputArrayEnter}
              ></input>
              <small className='text-muted'>
                {filtro.categorys.map((categoria, index) => (
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
            <div className='form-group mt-3'>
              <label htmlFor='tags'>Tags</label>
              <input
                id='tags'
                className='form-control'
                type='text'
                placeholder='Buscar por tags'
                name='tags'
                onBlur={handleInputArrayChange}
                onKeyPress={handleInputArrayEnter}
              ></input>
              <small className='text-muted'>
                {filtro.tags.map((tag, index) => (
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
              className='btn btn-outline-secondary mb-3'
              disabled={
                !filtro.title &&
                filtro.categorys.length === 0 &&
                filtro.tags.length === 0
              }
            >
              Filtrar
            </button>
            <button
              className='btn btn-outline-secondary mb-3 ml-3'
              onClick={() => {
                window.location.reload();
              }}
            >
              Limpiar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
