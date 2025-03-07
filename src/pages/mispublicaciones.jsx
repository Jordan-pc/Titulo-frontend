import React, { useState, useEffect } from 'react';
import { environment } from '../config/environment';
import { Link } from 'react-router-dom';

export const MisPublicaciones = () => {
  const [posts, setPosts] = useState([]);

  const TextNoPost = () => {
    if (posts.length > 0) {
      return <></>;
    }
    return <p className='ml-2'>No hay publicaciones registradas</p>;
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(environment.API_URL + '/myposts', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        }
      });
      const publications = await response.json();
      setPosts(publications);
    };
    getPosts();
  }, []);

  return (
    <div className='bg-white rounded box-shadow m-4 p-3'>
      <h4 className='mb-4 p-2'>Mis publicaciones</h4>
      <TextNoPost></TextNoPost>
      {posts.map((post, index) => (
        <div key={index} className='card m-1 mb-3'>
          <h5 className='card-title card-header'>{post.title}</h5>
          <div className='card-body'>
            <p className='card-title'>{post.content.substr(0, 300) + '...'}</p>
            <Link
              className='stretched-link'
              to={'/publications/' + post._id}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              {' '}
            </Link>
          </div>
        </div>
      ))}
      <Link className='btn btn-primary mt-3 ml-3' to='/'>
        Volver al inicio
      </Link>
    </div>
  );
};
