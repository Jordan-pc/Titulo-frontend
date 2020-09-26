import React, { useState, useEffect } from 'react';

export const Card = () => {
  const [post, setPost] = useState([]);

  const getPosts = async () => {
    const data = await fetch('http://localhost:3000/publications');
    const posts = await data.json();
    setPost(posts);
  };

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

  useEffect(() => {
    getPosts();
  });

  return (
    <>
      {post.map((post) => (
        <div className='col-md-8 mt-3 mb-3' key={post._id}>
          <div className='card'>
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
