import React, { useState, useEffect } from 'react';
import { environment } from '../config/environment';

export const VerifyAccount = (props) => {
  const [ok, setOk] = useState(false);

  const Message = () => {
    if (ok) {
      return (
        <div className='card-body text-success text-center'>
          Cuenta Verificada!
          <p>
            Para iniciar sesión haz click <a href='/login'>aquí</a>
          </p>
        </div>
      );
    }
    return (
      <div className='card-body text-danger text-center'>
        Ha ocurrido un error
      </div>
    );
  };

  useEffect(() => {
    const getAccount = async () => {
      const response = await fetch(
        environment.API_URL + '/user/validate/' + props.match.params.id,
        {
          method: 'put'
        }
      );
      const user = await response.json();
      console.log(user);
      if (user.message === 'Usuario habilitado') {
        setOk(true);
      }
    };
    getAccount();
  }, [props.match.params.id]);
  return (
    <div className='card border-success m-5'>
      <Message></Message>
    </div>
  );
};
