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
    <div className='bg-white rounded box-shadow m-4 p-3'>
      <Title></Title>
      {posts.map((post, index) => (
        <div key={index} className='card m-1 mb-3'>
          <h5 className='card-title card-header'>{post.title}</h5>
          <div className='card-body'>
            <p className='card-title'>{post.content.substr(0, 300) + '...'}</p>
            <a className='stretched-link' href={'/publications/' + post._id}>
              {' '}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
