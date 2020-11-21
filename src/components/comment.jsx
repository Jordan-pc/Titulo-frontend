import React, { useState } from 'react';
import { environment } from '../config/environment';

export const Comment = (props) => {
  const [postComment, setPostComment] = useState({ content: '' });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (event) => {
    setPostComment({
      ...postComment,
      [event.target.name]: event.target.value
    });
  };

  const doComment = async (event) => {
    event.preventDefault();
    const newComment = {
      content: sessionStorage.getItem('name') + ': ' + postComment.content
    };
    const response = await fetch(
      environment.API_URL + '/publications/' + props.id + '/comment',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        },
        body: JSON.stringify(newComment)
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
    window.location.reload();
  };

  return (
    <div className='card ml-3 mr-3 mb-2 bg-light'>
      {errors.map((error, index) => (
        <p className='text-danger text-break text-justify' key={index}>
          Error: {error}
        </p>
      ))}
      <form className='p-3' onSubmit={doComment}>
        <div className='form-group'>
          <h5>
            <label htmlFor='content'>Algún comentario?</label>
          </h5>
          <textarea
            id='content'
            type='text'
            className='form-control'
            name='content'
            onChange={handleInputChange}
          />
        </div>
        <button className='btn btn-primary'>Comentar</button>
      </form>
    </div>
  );
};
