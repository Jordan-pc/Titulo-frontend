import React, { useContext } from 'react';
import { PostContext } from '../context/postContext';
import { Link } from 'react-router-dom';
import image from '../assets/idx-pwd.png';

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
          <div className='row no-gutters'>
            <div className='col-md-3'>
              <img className='p-2 card-img' src={image} alt='Temp'></img>
            </div>
            <div className='col-md-9'>
              <div className='card-body'>
                <h4 className='card-title'>{post.title}</h4>
                <hr className='my-1' />

                <p className='card-text'>
                  {post.content.substr(0, 135) + '...'}
                </p>

                <div className='text-muted'>
                  <small>Categorias: {post.categorys + ' '}</small>
                  <Fecha createdAt={post.createdAt}></Fecha>
                </div>
              </div>
            </div>
          </div>
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
      ))}
    </>
  );
};
