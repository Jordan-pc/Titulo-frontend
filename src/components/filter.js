import React from 'react';

export const Filter = () => {
  return (
    <>
      <div className='col-md-4 ml-3 mt-3 card'>
        <form>
          <div className='from-group mt-3'>
            <label htmlFor='search'>
              <h5>Buscar</h5>
            </label>
            <input
              id='search'
              className='form-control'
              type='text'
              placeholder='...'
            ></input>
            <button
              className='btn btn-outline-secondary mt-2 mb-3'
              type='button'
            >
              Buscar
            </button>
          </div>
          <div className='form-group'>
            <h5>Filtros</h5>
            <label htmlFor='area'>Carrera</label>
            <select className='form-control' id='area'>
              <option>Ing. en Informática</option>
              <option>Arquitectura</option>
              <option>Quimica industrial</option>
              <option>Trabajo Social</option>
              <option>Dibujante Proyectista</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='tags'>Tags</label>
            <select multiple className='form-control' id='tags'>
              <option>Libros</option>
              <option>Software</option>
              <option>Herramientas</option>
              <option>Videos</option>
            </select>
          </div>
          <button type='button' className='btn btn-outline-secondary mb-3'>
            Filtrar
          </button>
        </form>
      </div>
    </>
  );
};
