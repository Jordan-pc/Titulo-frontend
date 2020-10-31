import React, { useState, useEffect } from 'react';

export const Reports = () => {
  const [reports, setReports] = useState([
    {
      _id: '',
      title: '',
      content: '',
      publication: ''
    }
  ]);
  const [errors, setErrors] = useState([]);

  const resolveReport = async (id) => {
    const response = await fetch('http://localhost:3000/report/' + id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token')
      }
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
    window.location.reload();
  };

  const TextNoReports = () => {
    if (reports.length > 0) {
      return <></>;
    }
    return <p>No hay reportes registrados</p>;
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch('http://localhost:3000/reports', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        }
      });
      const post = await response.json();
      if (post.message) {
        window.location = '/';
        return;
      }
      setReports(post);
    };
    getPost();
  }, []);

  return (
    <div className='bg-white rounded box-shadow m-4 p-3'>
      <h2 className='page-header mb-4 p-2'>Reportes</h2>
      {errors.map((error, index) => (
        <p className='text-danger text-break text-justify' key={index}>
          Error: {error}
        </p>
      ))}
      <TextNoReports></TextNoReports>
      {reports.map((report, index) => (
        <div key={index} className='card m-1 mb-3'>
          <h5 className='card-title card-header'>{report.title}</h5>
          <div className='card-body'>
            <p>{report.content}</p>
            <div className='row'>
              <a
                className='text-decoration-none col-sm'
                href={'/publications/' + report.publication}
              >
                Ir a la publicación
              </a>
              <div>
                <button
                  className='btn btn-primary float-right'
                  onClick={() => {
                    resolveReport(report._id);
                  }}
                >
                  Marcar como resuelta
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
