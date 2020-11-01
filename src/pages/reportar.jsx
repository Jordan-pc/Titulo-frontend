import React, { useState } from 'react';
import { environment } from '../config/environment';

export const Reportar = (props) => {
  const [report, setReport] = useState({});
  const [errors, setErrors] = useState([]);

  const handleInputChange = (event) => {
    setReport({
      ...report,
      [event.target.name]: event.target.value
    });
  };

  const sendReport = async (event) => {
    event.preventDefault();
    if (!report.title || report.title === 'Seleccione...') {
      setErrors(['Porfavor seleccione la falta o problema']);
    } else {
      const response = await fetch(
        environment.API_URL + '/report/publication/' + props.match.params.id,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('token')
          },
          body: JSON.stringify(report)
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
    }
  };

  return (
    <form
      className='card w-75 mt-5 mb-5 ml-5 mr-5 p-5 mx-auto'
      style={{ maxWidth: '500px' }}
      onSubmit={sendReport}
    >
      <h3 className='text-center'>Reportar</h3>

      {errors.map((error, index) => (
        <p className='text-danger text-break text-justify' key={index}>
          Error: {error}
        </p>
      ))}

      <div className='form-group'>
        <label>Falta o problema</label>
        <select
          className='custom-select my-1 mr-sm-2'
          name='title'
          onChange={handleInputChange}
        >
          <option>Seleccione...</option>
          <option>Contenido inadecuado</option>
          <option>Lenguaje ofensivo</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Descripción</label>
        <textarea
          type='text'
          className='form-control'
          placeholder='Ingrese una descripción o la razón de reporte'
          name='content'
          rows='5'
          onChange={handleInputChange}
        />
      </div>

      <button type='submit' className='btn btn-primary btn-block'>
        Enviar
      </button>
    </form>
  );
};
