import React, { useContext } from 'react';
import { PostContext } from '../context/postContext';

export const Card = () => {
  const { posts } = useContext(PostContext);

  const CardFooter = (props) => {
    const categorys = props.post.categorys;
    if (categorys && categorys.length !== 0) {
      return (
        <div className='text-muted'>
          <small>Categorias: </small>
          {categorys.map((categoria, index) => (
            <small key={index}>-{categoria} </small>
          ))}
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      {posts.map((post) => (
        <div className='mt-3 mb-3 mr-3 ml-3'>
          <div className='card' key={post._id}>
            <h5 className='card-header'>{post.title}</h5>
            <div className='card-body'>
              <p>{post.content.substr(0, 300) + '...'}</p>
              <CardFooter post={post}></CardFooter>
              <a className='stretched-link' href='/'>
                {' '}
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
