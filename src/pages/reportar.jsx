import React, { useState } from 'react';
import { environment } from '../config/environment';

export const Reportar = (props) => {
  const [report, setReport] = useState({});
  const [errors, setErrors] = useState([]);
  const [res, setRes] = useState(false);

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
      await delay(3500);
      window.location = '/';
    }
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const Success = () => {
    if (res) {
      return (
        <div className='card border-success mx-auto m-2'>
          <div className='card-body text-success text-center'>
            <p className='card-text'> Reporte realizado correctamente</p>
            <p className='card-text'> Redirigiendo al inicio</p>
          </div>
        </div>
      );
    }
    return <></>;
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

      <Success></Success>

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
          <option>Contenido inaccesible/desactualizado</option>
          <option>Otros</option>
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
