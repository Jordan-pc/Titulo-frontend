import React, { useContext } from 'react';
import { PostContext } from '../context/postContext';
import { Link } from 'react-router-dom';

export const Card = () => {
  const { posts } = useContext(PostContext);

  const NoPosts = () => {
    if (posts.length === 0) {
      return (
        <div className='card m-3'>
          <p className='m-3'>No se encontraron más publicaciones</p>
        </div>
      );
    }
    return <></>;
  };

  const Fecha = (props) => {
    const date = new Date(props.createdAt);
    return (
      <small className='float-right'>
        Fecha de publicación: {date.toLocaleDateString()}
      </small>
    );
  };

  return (
    <>
      <NoPosts></NoPosts>
      {posts.map((post) => (
        <div className='card mt-3 mb-3 mr-3 ml-3' key={post._id}>
          <h5 className='card-header'>{post.title}</h5>
          <div className='card-body'>
            <p>{post.content.substr(0, 300) + '...'}</p>

            <div className='text-muted'>
              <small>Categorias: {post.categorys + ' '}</small>
              <Fecha createdAt={post.createdAt}></Fecha>
            </div>

            <Link className='stretched-link' to={'/publications/' + post._id}>
              {' '}
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
