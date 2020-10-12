import React, { useState, useEffect } from 'react';

export const MisPublicaciones = () => {
  const [posts, setPosts] = useState([]);

  const Title = () => {
    if (posts.length > 0) {
      return <h4 className='mb-4 p-2'>Mis publicaciones</h4>;
    }
    return <strong>Usted no ha realizado ninguna publicación</strong>;
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:3000/myposts', {
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
    <div className='bg-white rounded box-shadow m-3 p-3'>
      <Title></Title>
      {posts.map((post, index) => (
        <div key={index} className='card m-1 mb-3'>
          <div className='card-body'>
            <h5 className='card-title'>{post.title}</h5>
            <a className='stretched-link' href={'/publications/' + post._id}>
              {' '}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
